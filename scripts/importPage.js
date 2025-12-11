// scripts/importPage.js
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import matter from 'gray-matter';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

// ------------------------
// Sanity client
// ------------------------
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// ------------------------
// Helper: Get next orderRank
// ------------------------
async function getLastOrderRank(pageType) {
  const query = `*[_type == $pageType] | order(orderRank desc)[0].orderRank`;
  const lastRank = await client.fetch(query, { pageType });

  if (!lastRank) {
    // First document, return initial rank
    return '0|hzzzzz:';
  }

  // Generate next rank after the last one
  const lastChar = lastRank.split('|')[1] || 'hzzzzz:';
  const nextChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
  return `0|${nextChar}`;
}

// ------------------------
// Helper: upload or reference image
// ------------------------
async function handleImage(imagePath) {
  if (!imagePath) return null;

  // If it's already a Sanity image reference
  if (imagePath.startsWith('image-') && imagePath.includes('-')) {
    return {
      _type: 'image',
      asset: {
        _ref: imagePath,
        _type: 'reference',
      },
    };
  }

  // Handle paths starting with /images/
  let fullPath = imagePath;
  if (imagePath.startsWith('/images/') || imagePath.startsWith('/')) {
    fullPath = path.join(process.cwd(), 'public', imagePath);
  } else {
    fullPath = path.join(process.cwd(), imagePath);
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  Image not found: ${fullPath}`);
    return null;
  }

  try {
    const imageAsset = await client.assets.upload('image', fs.createReadStream(fullPath));
    console.log(`✅ Uploaded image: ${path.basename(fullPath)}`);
    return {
      _type: 'image',
      asset: {
        _ref: imageAsset._id,
        _type: 'reference',
      },
    };
  } catch (error) {
    console.error(`❌ Failed to upload image: ${fullPath}`, error.message);
    return null;
  }
}

// ------------------------
// Convert Markdown string to Sanity Portable Text blocks
// ------------------------
function convertMarkdownToBlocks(text) {
  if (!text || typeof text !== 'string') return [];

  // Split into paragraphs
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return paragraphs.map((para) => {
    const children = [];

    // Split by bold markers (**text**)
    const parts = para.split(/(\*\*[^*]+\*\*)/g);

    parts.forEach((part) => {
      if (!part) return;

      if (part.startsWith('**') && part.endsWith('**')) {
        // Bold text - add "strong" mark
        children.push({
          _key: generateKey(),
          _type: 'span',
          text: part.slice(2, -2),
          marks: ['strong'],
        });
      } else if (part.trim()) {
        // Plain text
        children.push({
          _key: generateKey(),
          _type: 'span',
          text: part,
          marks: [],
        });
      }
    });

    return {
      _type: 'block',
      _key: generateKey(),
      style: 'normal',
      children: children.length > 0 ? children : [
        {
          _key: generateKey(),
          _type: 'span',
          text: para,
          marks: [],
        },
      ],
      markDefs: [],
    };
  });
}

// ------------------------
// Generate short unique keys (matching Sanity's format)
// ------------------------
function generateKey() {
  return Math.random().toString(36).substring(2, 14);
}

// ------------------------
// Import page
// ------------------------
async function importPage(mdFilePath) {
  if (!fs.existsSync(mdFilePath)) {
    console.error('❌ Markdown file not found:', mdFilePath);
    process.exit(1);
  }

  console.log(`📄 Reading file: ${mdFilePath}`);
  const content = fs.readFileSync(mdFilePath, 'utf8');
  const { data } = matter(content);

  // Validate required fields
  if (!data.title) {
    console.error('❌ Missing required field: title');
    process.exit(1);
  }

  if (!data.slug) {
    console.error('❌ Missing required field: slug');
    process.exit(1);
  }

  const pageType = data.pageType || 'page';
  console.log(`📝 Page type: ${pageType}`);

  // Get the next orderRank
  const orderRank = await getLastOrderRank(pageType);
  console.log(`📊 Setting orderRank: ${orderRank}`);

  if (!data.sections) {
    data.sections = [];
  }

  console.log(`🔄 Processing ${data.sections.length} sections...`);

  // Process sections
  for (let i = 0; i < data.sections.length; i++) {
    const section = data.sections[i];
    console.log(`  Section ${i + 1}: ${section.type || 'unknown'}`);

    section._type = section.type;
    section._key = generateKey();
    delete section.type; // Remove the 'type' field

    // Convert text fields to blocks
    ['heading', 'subheading', 'lead', 'body', 'reference'].forEach((key) => {
      if (section[key] && typeof section[key] === 'string') {
        section[key] = convertMarkdownToBlocks(section[key]);
      }
    });

    // Handle images
    if (section.image) {
      section.image = await handleImage(section.image);
    }

    if (section.backgroundImage) {
      section.backgroundImage = await handleImage(section.backgroundImage);
    }

    // Handle CTAs (no _type field needed based on your JSON)
    if (section.cta) {
      ['heading', 'body'].forEach((key) => {
        if (section.cta[key] && typeof section.cta[key] === 'string') {
          section.cta[key] = convertMarkdownToBlocks(section.cta[key]);
        }
      });
    }

    // Handle lists (array of list objects)
    if (section.lists && Array.isArray(section.lists)) {
      for (const list of section.lists) {
        list._key = generateKey();

        // Convert list heading if it exists
        if (list.heading && typeof list.heading === 'string') {
          list.heading = convertMarkdownToBlocks(list.heading);
        }

        // Process list items
        if (list.items && Array.isArray(list.items)) {
          for (const item of list.items) {
            item._key = generateKey();
            item._type = 'item';

            ['heading', 'subheading', 'body'].forEach((key) => {
              if (item[key] && typeof item[key] === 'string') {
                item[key] = convertMarkdownToBlocks(item[key]);
              }
            });

            if (item.icon) {
              item.icon = await handleImage(item.icon);
            }
          }
        }
      }
    }
  }

  const safeId = `${data.slug}-import`;

  const doc = {
    _id: safeId,
    _type: pageType,
    title: data.title,
    slug: {
      _type: 'slug',
      current: data.slug,
    },
    orderRank, // ✅ Add orderRank here
    sections: data.sections,
  };

  // Add optional fields if they exist
  if (data.metaTitle) doc.metaTitle = data.metaTitle;
  if (data.metaDescription) doc.metaDescription = data.metaDescription;

  console.log(`\n📤 Creating/replacing document in Sanity...`);

  await client.createOrReplace(doc);

  console.log(`\n✅ Successfully imported: ${data.title}`);
  console.log(`   Type: ${pageType}`);
  console.log(`   ID: ${safeId}`);
  console.log(`   Slug: ${data.slug}`);
  console.log(`   Order Rank: ${orderRank}`);
}

// ------------------------
// CLI
// ------------------------
const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/importPage.js <markdown-file>');
  console.error('Example: node scripts/importPage.js ./content/cybersecurity.md');
  process.exit(1);
}

importPage(filePath)
  .then(() => console.log('\n🎉 Import complete!'))
  .catch((err) => {
    console.error('\n❌ Import failed:', err.message);
    console.error(err);
    process.exit(1);
  });
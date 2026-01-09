// scripts/importAllPages.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { importPage } from './importPage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------
// Find all markdown files in content subfolders
// ------------------------
function findMarkdownFiles() {
  const contentDir = path.join(__dirname, '..', 'content');
  const folders = ['industryPages', 'servicePages'];
  const markdownFiles = [];

  folders.forEach((folder) => {
    const folderPath = path.join(contentDir, folder);
    if (!fs.existsSync(folderPath)) {
      console.warn(`⚠️  Folder not found: ${folderPath}`);
      return;
    }

    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      // Skip template files
      if (file.toLowerCase().includes('template')) {
        return;
      }

      if (file.endsWith('.md')) {
        markdownFiles.push({
          path: path.join(folderPath, file),
          folder,
          filename: file,
        });
      }
    });
  });

  return markdownFiles;
}

// ------------------------
// Import all pages
// ------------------------
async function importAllPages() {
  const files = findMarkdownFiles();

  if (files.length === 0) {
    console.log('❌ No markdown files found in content/industryPages or content/servicePages');
    process.exit(1);
  }

  console.log(`\n📦 Found ${files.length} markdown file(s) to import:\n`);
  files.forEach((file, index) => {
    console.log(`  ${index + 1}. ${file.folder}/${file.filename}`);
  });

  console.log(`\n🚀 Starting batch import...\n`);
  console.log('═'.repeat(60));

  const results = {
    success: [],
    failed: [],
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(`\n[${i + 1}/${files.length}] Processing: ${file.folder}/${file.filename}`);
    console.log('─'.repeat(60));

    try {
      await importPage(file.path);
      results.success.push(file);
      console.log(`✅ Successfully imported: ${file.filename}`);
    } catch (err) {
      results.failed.push({ file, error: err.message });
      console.error(`❌ Failed to import: ${file.filename}`);
      console.error(`   Error: ${err.message}`);
      // Continue with next file instead of stopping
    }

    // Add a small delay between imports to avoid rate limiting
    if (i < files.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // Summary
  console.log('\n');
  console.log('═'.repeat(60));
  console.log('\n📊 Import Summary:\n');
  console.log(`✅ Successful: ${results.success.length}`);
  results.success.forEach((file) => {
    console.log(`   ✓ ${file.folder}/${file.filename}`);
  });

  if (results.failed.length > 0) {
    console.log(`\n❌ Failed: ${results.failed.length}`);
    results.failed.forEach(({ file, error }) => {
      console.log(`   ✗ ${file.folder}/${file.filename}`);
      console.log(`     ${error}`);
    });
  }

  console.log('\n🎉 Batch import complete!\n');

  // Exit with error code if any failed
  if (results.failed.length > 0) {
    process.exit(1);
  }
}

// Run the import
importAllPages().catch((err) => {
  console.error('\n❌ Batch import failed:', err.message);
  console.error(err);
  process.exit(1);
});

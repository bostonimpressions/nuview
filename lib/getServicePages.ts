import { client } from '@/sanity/lib/client';

export async function getServicePages() {
  const query = `*[_type == "page" && slug.current match "services/*"] {
    title,
    "slug": slug.current
  }`;

  try {
    const pages = await client.fetch(query);

    // Define your desired order
    const desiredOrder = [
      'services/cybersecurity',
      'services/managed-it',
      'services/co-managed-it',
      'services/managed-compliance',
      'services/fractional-it-leadership',
    ];

    // Sort based on desired order
    return pages.sort((a, b) => {
      const indexA = desiredOrder.indexOf(a.slug);
      const indexB = desiredOrder.indexOf(b.slug);
      return indexA - indexB;
    });
  } catch (error) {
    console.error('Error fetching service pages:', error);
    return [];
  }
}

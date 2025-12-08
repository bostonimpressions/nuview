import { client } from '@/sanity/lib/client';

export async function getServicePages() {
  const query = `*[_type == "servicePage"] | order(sortOrder asc){
    title,
    "slug": slug.current,
    sortOrder
  }`;

  try {
    const pages = await client.fetch(query);
    return pages;
  } catch (error) {
    console.error('Error fetching service pages:', error);
    return [];
  }
}

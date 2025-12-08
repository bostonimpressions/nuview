import { client } from '@/sanity/lib/client';

export async function getIndustryPages() {
  const query = `*[_type == "page" && slug.current match "industries/*"] | order(sortOrder asc) {
    title,
    "slug": slug.current,
    sortOrder
  }`;

  try {
    const pages = await client.fetch(query);
    return pages;
  } catch (error) {
    console.error('Error fetching industry pages:', error);
    return [];
  }
}

import { sanityClient } from './sanity';

export async function getPageData(slug: string) {
  return sanityClient.fetch(
    `*[_type in ["page", "servicePage", "blogPage"] && slug.current == $slug][0]{
      _type,  
      title,
      slug,
      sections
    }`,
    { slug }
  );
}

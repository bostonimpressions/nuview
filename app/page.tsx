import SectionHeroMain from '@/components/sections/SectionHeroMain';
import SectionFeature from '@/components/sections/SectionFeature';
import SectionOverview from '@/components/sections/SectionOverview';
import { getPageData } from '@/lib/getPageData';

export default async function Home() {
  // Fetch the "home" page content from Sanity
  const page = await getPageData('home');

  if (!page) return <div>Page not found</div>;

  return (
    <main className="font-sans">
      {page.sections?.map((section: any, i: number) => {
        const { _type, _key, ...props } = section;

        switch (_type) {
          case 'sectionHeroMain': // Sanity schema -- sanity/schemaTypes/
            return <SectionHeroMain key={i} {...props} />; // React component -- components/sections
          case 'sectionOverview':
            return <SectionOverview key={i} {...props} />;
          case 'sectionFeature':
            return <SectionFeature key={i} {...props} />;

          default:
            return null;
        }
      })}
    </main>
  );
}

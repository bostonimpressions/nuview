// app/contact/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { defaultMetadata } from '@/lib/seo';
import { getPageData, PageData } from '@/lib/getPageData';

//import ContactForm from '@/components/contact/ContactForm';
import ContactDetails from '@/components/contact/ContactDetails';

import SectionBanner from '@/components/sections/SectionBanner';
import SectionHeroMain from '@/components/sections/SectionHeroMain';
import SectionHeroSubpage from '@/components/sections/SectionHeroSubpage';
import SectionOverview from '@/components/sections/SectionOverview';
import SectionFeatureList from '@/components/sections/SectionFeatureList';
import SectionFeature from '@/components/sections/SectionFeature';
import SectionSnapshots from '@/components/sections/SectionSnapshots';
import SectionComparison from '@/components/sections/SectionComparison';
import SectionCallToAction from '@/components/sections/SectionCallToAction';
import SectionDetails from '@/components/sections/SectionDetails';

const sectionComponents: Record<string, React.ComponentType<any>> = {
  sectionBanner: SectionBanner,
  sectionHeroMain: SectionHeroMain,
  sectionHeroSubpage: SectionHeroSubpage,
  sectionOverview: SectionOverview,
  sectionFeatureList: SectionFeatureList,
  sectionFeature: SectionFeature,
  sectionSnapshots: SectionSnapshots,
  sectionComparison: SectionComparison,
  sectionCallToAction: SectionCallToAction,
  sectionDetails: SectionDetails,
};

export const revalidate = 300;

export default async function ContactPage() {
  const slug = 'contact';
  const page = await getPageData(slug);

  if (!page) notFound();

  const sections = page.sections ?? [];

  const heroMainSection = sections.find(
    (section) => section._type === 'sectionHeroMain'
  );

  const remainingSections = sections.filter(
    (section) => section._type !== 'sectionHeroMain'
  );

  return (
    <main className="font-sans">
      {heroMainSection && (
        <SectionHeroMain {...heroMainSection} />
      )}

      <section className="relative overflow-hidden py-12 bg-white">
        <div className="container mx-auto px-4">
          <ContactDetails />
          {/*<ContactForm />*/}
        </div>
      </section>

      {remainingSections.map((section, i) => {
        const { _type, ...props } = section;
        const SectionComponent = sectionComponents[_type];

        if (!SectionComponent) {
          console.warn(`Unknown section type: ${_type}`);
          return null;
        }

        return <SectionComponent key={`${_type}-${i}`} {...props} />;
      })}
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'contact';
  const page: PageData | null = await getPageData(slug);

  if (!page) return defaultMetadata;

  const title = page.metaTitle || defaultMetadata.title!;
  const description = page.metaDescription || defaultMetadata.description!;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: '/contact',
    },
  };
}

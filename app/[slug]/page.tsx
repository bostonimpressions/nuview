// app/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { defaultMetadata } from '@/lib/seo';
import { getPageData, getAllPageSlugs, PageData } from '@/lib/getPageData';

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

interface PageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

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

export const revalidate = 0;

export default async function Page(props: PageProps) {
  const params = props.params instanceof Promise ? await props.params : props.params;

  // Map 'home' param to '/' slug in Sanity
  const slug = params.slug === 'home' ? '/' : params.slug;

  const page: PageData | null = await getPageData(slug);

  if (!page) notFound();

  return (
    <main className="font-sans">
      {page.sections?.map((section, i) => {
        const { _type, ...sectionProps } = section;
        const SectionComponent = sectionComponents[_type];

        if (!SectionComponent) {
          console.warn(`Unknown section type: ${_type}`);
          return null;
        }

        return <SectionComponent key={`${_type}-${i}`} {...sectionProps} />;
      })}
    </main>
  );
}

// Generate static params for all pages in Sanity
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({
    slug: slug === '/' ? 'home' : slug,
  }));
}

// Generate metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = props.params instanceof Promise ? await props.params : props.params;
  const slug = params.slug === 'home' ? '/' : params.slug;

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
      url: `/${slug === '/' ? '' : slug}`,
    },
  };
}

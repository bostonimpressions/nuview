// app/[...slug]/page.tsx
import SectionBanner from '@/components/sections/SectionBanner';
import { getPageData } from '@/lib/getPageData';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DynamicPage(props: PageProps) {
  // Await params before accessing its properties
  const params = await props.params;

  // join slug safely
  const slug = params?.slug?.join('/') || '';

  // fetch page from Sanity
  const page = await getPageData(slug);

  if (!page) {
    return (
      <div className="container mx-auto min-h-screen p-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-red-600">404 - Page Not Found</h1>
        <p className="text-xl text-gray-700">Could not find a page with slug: {slug}</p>
      </div>
    );
  }

  return (
    <main className="font-sans">
      {page.sections?.map((section: any, i: number) => {
        const { _type, ...props } = section;
        switch (_type) {
          case 'sectionBanner':
            return <SectionBanner key={i} {...props} />;
          default:
            return null;
        }
      })}
    </main>
  );
}

// Optional: Generate static params for static generation
export async function generateStaticParams() {
  // You can fetch all possible slugs from Sanity here
  // For now, return an empty array (all pages will be generated on-demand)
  return [];
}

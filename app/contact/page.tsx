// app/contact/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { defaultMetadata } from '@/lib/seo';
import { getPageData, PageData } from '@/lib/getPageData';

import ContactTabs from '@/components/contact/ContactTabs';
import SectionBanner from '@/components/sections/SectionBanner';
import SectionHeroMain from '@/components/sections/SectionHeroMain';
import SectionOverview from '@/components/sections/SectionOverview';

export const revalidate = 300;

export default async function ContactPage() {
  const slug = 'contact';
  const page: PageData | null = await getPageData(slug);

  if (!page) notFound();

  const sections = page.sections ?? [];

  return (
    <main className="font-sans">
      {sections.map((section, i) =>
        section._type === 'sectionHeroMain' ? (
          <SectionHeroMain key={`hero-${i}`} {...section} />
        ) : null
      )}

      <section id="contact" className="relative overflow-hidden bg-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactTabs />
            </div>

            <div className="lg:mt-21 rounded-2xl bg-gray-50 p-10 lg:col-span-1">
              <h3>Contact Details:</h3>
              <div className="contact-details flex flex-col gap-4">
                <div className="text-lg">
                  <span className="mr-2 font-semibold">Phone:</span>
                  <p className="inline-block">
                    <a
                      href="tel:18556884390"
                      className="text-nugreen-600 hover:text-nugreen-700 font-semibold"
                    >
                      (855) 688-4390
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {sections.map((section, i) => {
        switch (section._type) {
          case 'sectionBanner':
            return <SectionBanner key={i} {...section} />;
          case 'sectionOverview':
            return <SectionOverview key={i} {...section} />;
          default:
            return null;
        }
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
    openGraph: { title, description, url: '/contact' },
  };
}

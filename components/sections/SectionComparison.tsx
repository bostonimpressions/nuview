import React from 'react';
import TextHeading from '@/components/ui/TextHeading';
import List from '@/components/ui/List';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';

interface ListItem {
  heading: PortableTextBlock[];
}

interface ComparisonPanel {
  heading?: PortableTextBlock[];
  items: ListItem[];
}

interface Props {
  heading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  nuview: ComparisonPanel;
  competitor: ComparisonPanel;
}

function SectionComparison({ heading, body, nuview, competitor }: Props) {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-10">
          {heading && (
            <div className="md:col-span-1">
              <TextHeading level="h2">
                <PortableText value={heading} />
              </TextHeading>
            </div>
          )}

          {body && (
            <div className="md:col-span-2">
              <PortableText value={body} />
            </div>
          )}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Nuview panel */}
          <div className="shadow-lg mb-2">
            <header className="mb-2 pt-5 pb-5 text-center border-sapphire-500 border-t-5 border-b-50 min-h-38 content-center">

              <h3 className="relative h-9 w-auto ml-auto mr-auto">
                <div className="sr-only">nuview</div>
                <Image
                  src="/logo.png"
                  alt="nuview"
                  fill
                  className="object-contain"
                />
              </h3>


            </header>
            <List theme="good" columns={1} items={nuview.items.map(item => ({ heading: item.heading }))} className="p-6 md:p-10 pt-6 pb-12" />
          </div>

          {/* Competitor panel */}
          <div className="shadow-lg mb-2">
            {competitor.heading && (
              <header className="mb-2 pt-5 pb-5 text-center border-magenta-100 border-t-5 border-b-50 min-h-38 content-center">
                <h3>
                  <PortableText value={competitor.heading} />
                </h3>
              </header>
            )}
            <List theme="bad" columns={1} items={competitor.items.map(item => ({ heading: item.heading }))} className="p-6 md:p-10 pt-6 pb-12" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionComparison;

'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import List from '@/components/ui/List/List';

interface ListItem {
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  image?: { url: string; alt?: string };
}

interface ListSection {
  heading?: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  theme?: 'default' | 'cards' | 'cards-white' | 'checks' | 'flags' | 'negatives' | 'positives';
  columns?: 1 | 2 | 3;
  items: ListItem[];
}

interface CTA {
  heading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  icon?: string;
  link?: string;
}

interface Props {
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  image?: { url: string; alt?: string };
  imageLayout?: 'imgLeft' | 'imgRight';
  imageGrid?: '1/1' | '2/3' | '3/2';
  list?: ListSection;
  cta?: CTA;
  theme?: 'light' | 'dark';
}

export default function SectionOverview({
  heading,
  subheading,
  body,
  image,
  imageLayout = 'imgLeft',
  imageGrid = '1/1',
  list,
  cta,
  theme = 'light',
}: Props) {
  // Determine grid template based on imageGrid
  const getGridClasses = () => {
    switch (imageGrid) {
      case '2/3':
        return 'md:grid-cols-[2fr_3fr]';
      case '3/2':
        return 'md:grid-cols-[3fr_2fr]';
      case '1/1':
      default:
        return 'md:grid-cols-2';
    }
  };

  const isImageLeft = imageLayout === 'imgLeft';

  return (
    <section
      className={`relative overflow-hidden py-12 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`grid gap-6 ${getGridClasses()} items-center`}>
          {/* Image Column */}
          {image && isImageLeft && (
            <div className="order-1 md:order-1">
              <Image
                src={image.url}
                alt={image.alt || ''}
                width={800}
                height={600}
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
          )}

          {/* Text Column */}
          <div className="order-2 md:order-2">
            {heading && (
              <h2 className="mb-2 text-3xl font-bold">
                <PortableText value={heading} />
              </h2>
            )}
            {subheading && (
              <h3 className="mb-4 text-xl">
                <PortableText value={subheading} />
              </h3>
            )}
            {body && (
              <div className="mb-6">
                <PortableText value={body} />
              </div>
            )}
          </div>

          {/* Image Column on right */}
          {image && !isImageLeft && (
            <div className="order-1 md:order-3">
              <Image
                src={image.url}
                alt={image.alt || ''}
                width={800}
                height={600}
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
          )}
        </div>

        {/* List Section */}
        {list && list.items.length > 0 && (
          <div className="mt-12">
            {list.heading && (
              <h3 className="mb-2 text-2xl font-bold">
                <PortableText value={list.heading} />
              </h3>
            )}
            {list.subheading && (
              <h4 className="mb-4 text-lg">
                <PortableText value={list.subheading} />
              </h4>
            )}
            {list.body && (
              <div className="mb-6">
                <PortableText value={list.body} />
              </div>
            )}

            <List items={list.items} columns={list.columns} theme={list.theme} />
          </div>
        )}

        {/* CTA Section */}
        {cta && (
          <div className="mt-12 flex flex-col items-center gap-4 md:flex-row">
            {cta.icon && <div className="text-4xl">{cta.icon}</div>}
            <div>
              {cta.heading && (
                <h4 className="mb-1 font-bold">
                  <PortableText value={cta.heading} />
                </h4>
              )}
              {cta.body && (
                <div className="mb-2">
                  <PortableText value={cta.body} />
                </div>
              )}
              {cta.link && (
                <a
                  href={cta.link}
                  className="inline-block rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                >
                  Learn More
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

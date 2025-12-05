'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '@/sanity/lib/image';
import List from '@/components/ui/List';
import TextHeading from '@/components/ui/TextHeading';
import React from 'react';

interface ListItem {
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  icon?: { url: string; alt?: string };
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
  icon?: SanityImageSource;
  link?: string;
}

interface Props {
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  image?: SanityImageSource;
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
      className={`relative overflow-hidden py-12 ${theme === 'dark' ? 'bg-perano-200' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`grid ${getGridClasses()} items-center gap-10 ${image && 'pb-10 md:pb-20'}`}
        >
          {/* Image Column */}
          {image && isImageLeft && (
            <div className="order-1 md:order-1">
              <div className="relative aspect-[3/2] h-auto w-full">
                <Image
                  src={urlFor(image).url()}
                  alt="Illustration"
                  fill
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>
            </div>
          )}

          {/* Text Column */}
          <div className="order-2 md:order-2">
            {heading && (
              <TextHeading level={'h2'}>
                <PortableText value={heading} />
              </TextHeading>
            )}
            {subheading && (
              <h4>
                <PortableText value={subheading} />
              </h4>
            )}
            {body && <PortableText value={body} />}
          </div>

          {/* Image Column on right */}
          {image && !isImageLeft && (
            <div className="order-1 md:order-3">
              <div className="relative aspect-[3/2] h-auto w-full">
                <Image
                  src={urlFor(image).url()}
                  alt="Illustration"
                  fill
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* List Section */}
        {list?.items && list.items.length > 0 && (
          <div className="">
            {list.heading && (
              <h3>
                <PortableText value={list.heading} />
              </h3>
            )}
            {list.subheading && (
              <h4>
                <PortableText value={list.subheading} />
              </h4>
            )}
            {list.body && (
              <div className="mb-2">
                <PortableText value={list.body} />
              </div>
            )}

            <List items={list.items || []} columns={list.columns} theme={list.theme} />
          </div>
        )}

        {/* CTA Section */}
        {cta && (
          <div className="call-to-action mt-8">
            {cta.heading && (
              <h3>
                <PortableText value={cta.heading} />
              </h3>
            )}

            <div className="bg-sapphire-500 flex items-center gap-5 rounded-lg p-5 text-white md:gap-8 md:p-10">
              {cta?.icon ? (
                <div className="icon-wrapper">
                  <Image src={urlFor(cta.icon).url()} alt="check" fill />
                </div>
              ) : (
                <div className="icon-wrapper aspect-[1/.8]!">
                  <Image src={'/images/icon-check-green.png'} alt={'check'} fill />
                </div>
              )}

              {cta.body && <PortableText value={cta.body} />}
              {cta.link && (
                <a href={cta.link} className="">
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

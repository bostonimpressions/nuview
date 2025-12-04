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
  image?: { url: string; alt?: string };
}

interface ListSection {
  theme?: 'default' | 'cards' | 'cards-white' | 'checks' | 'flags' | 'negatives' | 'positives';
  columns?: 1 | 2 | 3;
  items: ListItem[];
}

interface Props {
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  image?: SanityImageSource;
  imageLayout?: 'imgLeft' | 'imgRight';
  list?: ListSection;
  theme?: 'light' | 'dark';
}

export default function SectionFeature({
  heading,
  subheading,
  body,
  image,
  imageLayout = 'imgLeft',
  list,
  theme = 'light',
}: Props) {
  const isImageLeft = imageLayout === 'imgLeft';

  return (
    <section
      className={`relative overflow-hidden py-20 ${theme === 'dark' ? 'bg-perano-200' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
          {/* Image Column */}
          {image && isImageLeft && (
            <div className="order-1 md:order-1">
              <div className="relative aspect-square h-auto w-full">
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

            {/* List Section */}
            {list?.items && list.items.length > 0 && (
              <List compact items={list.items || []} columns={list.columns} theme={list.theme} />
            )}
          </div>

          {/* Image Column on right */}
          {image && !isImageLeft && (
            <div className="order-1 md:order-3">
              <div className="relative aspect-square h-auto w-full">
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
      </div>
    </section>
  );
}

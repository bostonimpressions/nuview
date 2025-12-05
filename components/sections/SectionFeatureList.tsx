'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { SanityImageSource } from '@sanity/image-url';
import List from '@/components/ui/List';
import TextHeading from '@/components/ui/TextHeading';
import React from 'react';

interface ListItem {
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  icon?: SanityImageSource;
}

interface ListSection {
  theme?: 'default' | 'cards' | 'cards-white' | 'checks' | 'flags' | 'negatives' | 'positives';
  columns?: 1 | 2 | 3;
  items: ListItem[];
}

interface Props {
  heading: PortableTextBlock[];
  list: ListSection;
  theme?: 'light' | 'dark';
}

export default function SectionOverview({ heading, list, theme = 'light' }: Props) {
  return (
    <section
      className={`relative overflow-hidden py-12 ${theme === 'dark' ? 'bg-perano-200' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4">
        <div className="pb-10">
          {heading && (
            <TextHeading level={'h2'}>
              <PortableText value={heading} />
            </TextHeading>
          )}
        </div>

        {/* List Section */}
        {list && list.items.length > 0 && (
          <List items={list.items} columns={list.columns} theme={list.theme} />
        )}
      </div>
    </section>
  );
}

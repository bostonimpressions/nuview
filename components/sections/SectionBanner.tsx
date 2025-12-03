'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import React from 'react';

interface Props {
  theme?: 'light' | 'medium' | 'dark' | 'green';
  body: PortableTextBlock[];
  reference?: PortableTextBlock[];
}

const themeClasses: Record<string, string> = {
  light: 'bg-white text-sapphire-500',
  medium: 'bg-solitude-500 text-sapphire-500',
  dark: 'bg-perano-500 text-white',
  green: 'bg-nugreen-500 text-biscay-500',
};

export default function SectionOverview({ body, reference, theme = 'light' }: Props) {
  return (
    <section
      className={`relative overflow-hidden py-12 ${themeClasses[theme] || themeClasses.light}`}
    >
      <div className="container mx-auto px-4">
        <h3 className={`text-center text-xl font-semibold md:text-2xl`}>
          <PortableText value={body} />
        </h3>
        {reference && (
          <div className="reference-text text-lg md:text-xl">
            <PortableText value={reference} />
          </div>
        )}
      </div>
    </section>
  );
}

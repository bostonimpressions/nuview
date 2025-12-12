'use client';

import { PortableText, toPlainText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import TextHeading from '@/components/ui/TextHeading';
import StepsList from '@/components/ui/StepsList';
import StatsList from '@/components/ui/StatsList';
import React from 'react';

interface StepItem {
  heading?: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
}

interface SecondaryContent {
  heading?: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
}

interface StatItem {
  heading?: PortableTextBlock[];
  label?: string;
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
}

interface StatRow {
  heading?: PortableTextBlock[];
  list: StatItem[];
}

interface SectionDetailsProps {
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  steps?: StepItem[];
  secondary?: SecondaryContent;
  stats?: StatRow[];
}


export default function SectionDetails({
                                         heading,
                                         subheading,
                                         body,
                                         steps,
                                         secondary,
                                         stats
                                       }: SectionDetailsProps) {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-0! sm:p-6! md:p-8!">
        <div className="bg-biscay-500 text-white sm:rounded-xl p-0!">

          {/* Top heading/subheading/body */}
          <div className="mb-12 px-10 py-10! md:pt-20! sm:px-14! md:px-20!">
            {heading && <TextHeading level="h2" color={'text-white'}><PortableText value={heading} /></TextHeading>}
            {subheading && <h3 className="mt-2"><PortableText value={subheading} /></h3>}
            {body && <div className="mt-2"><PortableText value={body} /></div>}
          </div>

          {/* Steps List */}
          {steps && steps.length > 0 && (
            <div className="px-10 sm:px-14! md:px-20!">
              <StepsList items={steps} />
            </div>
          )}

          {/* Secondary content row */}
          {secondary && (secondary.heading || secondary.subheading || secondary.body) && (
            <div className="mt-36 px-10 sm:px-14! md:px-20!">
              {secondary.heading && <h3 className="font-semibold"><PortableText value={secondary.heading} /></h3>}
              {secondary.subheading && <h4 className="mt-1"><PortableText value={secondary.subheading} /></h4>}
              {secondary.body && <div className="text-perano-500 mt-2"><PortableText value={secondary.body} /></div>}
            </div>
          )}

          {/* Stats footer */}
          {stats && stats.length > 0 && (
            <div className="mt-24 px-10 py-20! sm:px-14! md:px-20! bg-sapphire-500 sm:rounded-xl sm:rounded-t-none">
              <StatsList stats={stats} />
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

import React from 'react';
import TextHeading from '@/components/ui/TextHeading';
import List from '@/components/ui/List';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

interface SnapshotPanel {
  heading?: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  impact?: PortableTextBlock[];
}

interface Props {
  theme?: 'light' | 'dark' | 'none';
  heading?: PortableTextBlock[];
  panels: SnapshotPanel[];
}

function SectionSnapshots({ theme, heading, panels }: Props) {
  return (
    <section
      className={`relative overflow-hidden p-10 ${
        theme === 'dark' ? 'bg-perano-200' : theme === 'light' ? 'bg-white' : 'bg-transparent'
      }`}
    >

    <div className="container mx-auto">
        {/* Top-level heading */}
        {heading && (
          <TextHeading level="h2">
            <PortableText value={heading} />
          </TextHeading>
        )}

        {/* Panels */}
        {panels?.map((panel, idx) => (
          <div
            key={idx}
            className="panel w-full bg-perano-200 p-14 mb-6 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="flex flex-col justify-start">
                <div className="font-semibold text-xl text-perano-600 mb-2">About client</div>
                {panel.heading && (
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    <PortableText value={panel.heading} />
                  </h3>
                )}
                {panel.subheading && (
                  <div className="text-gray-800 mb-4">
                    <PortableText value={panel.subheading} />
                  </div>
                )}
                {panel.body && (
                  <div className="text-gray-700">
                    <PortableText value={panel.body} />
                  </div>
                )}
              </div>

              {/* Right Column - Snapshot List */}
              <div>
                <List
                  columns={1}
                  theme="snapshot"
                  items={[
                    { heading: [{ _type: 'block', style: 'normal', markDefs: [], children: [{ _type: 'span', text: 'Challenge', marks: [] }] }], body: panel.challenge },
                    { heading: [{ _type: 'block', style: 'normal', markDefs: [], children: [{ _type: 'span', text: 'Solution', marks: [] }] }], body: panel.solution },
                    { heading: [{ _type: 'block', style: 'normal', markDefs: [], children: [{ _type: 'span', text: 'Impact', marks: [] }] }], body: panel.impact },
                  ]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SectionSnapshots;

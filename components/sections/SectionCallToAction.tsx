import React from 'react';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Link from 'next/link';

interface Link {
  text: string;
  url: string;
}

interface Props {
  heading: PortableTextBlock[];
  body?: PortableTextBlock[];
  link: Link;
}

function SectionComparison({ heading, body, link }: Props) {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto">
        <div className="relative rounded-xl overflow-hidden p-20">

          {/* Green background */}
          <div className="bg-nugreen-500 w-full h-full absolute inset-0"></div>

          {/* Black → transparent gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-color-burn"></div>

          {/* Content */}
          <div className="flex flex-col relative max-w-[540px] m-auto text-center gap-10">
            <h2 className="text-white mb-0">
              <PortableText value={heading} />
            </h2>

            {link && (
              <Link href={link.url} className="btn-primary-white p-3 text-lg">{link.text}</Link>

            )}


            {body && (
              <div className="text-sm text-white">
                <PortableText value={body} />
              </div>
            )}

          </div>

        </div>
      </div>
    </section>

  );
}

export default SectionComparison;

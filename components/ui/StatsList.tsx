'use client';

import React from 'react';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

export interface StatItem {
  heading?: PortableTextBlock[];
  label?: string;
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
}

export interface StatRow {
  heading?: PortableTextBlock[];
  list: StatItem[];
}

interface StatsListProps {
  stats: StatRow[];
}

export default function StatsList({ stats }: StatsListProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="stats space-y-12">
      {stats.map((row, i) => (
        <div key={i} className="relative border-2 border-white p-6 rounded-xl">
          {row.heading && (
            <h4 className="relative w-fit font-semibold mb-2 bg-sapphire-500 p-4 mt-[-55px]">
              <PortableText value={row.heading} />
            </h4>
          )}

          {row.list && row.list.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-14 p-4 relative">
              {row.list.map((item, j) => (
                <li key={j} className="relative">

                  {/* Heading + Label */}
                  {(item.heading || item.label) && (
                    <h4 className="flex items-baseline w-fit text-4xl font-bold mb-1">
                      {item.heading && <PortableText value={item.heading} />}
                      {item.label && (
                        <span className="text-2xl font-medium ml-2">{item.label}</span>
                      )}
                    </h4>
                  )}

                  {/* Subheading */}
                  {item.subheading && (
                    <p>
                      <PortableText value={item.subheading} />
                    </p>
                  )}

                  {/* Body */}
                  {item.body && (
                    <div className="relative flex">
                      <PortableText
                        value={item.body}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="text-sm text-perano-500">{children}</p>
                            ),
                          },
                        }}
                      />

                      {/* divider */}
                      <div
                        className={`absolute -right-6  
              w-2 h-12 bg-perano-500 rounded-full hidden md:block
              ${ (j + 1) % 3 === 0 ? 'md:hidden' : '' }`}
                      ></div>
                    </div>
                  )}

                </li>
              ))}
            </ul>

          )}

        </div>
      ))}
    </div>
  );
}

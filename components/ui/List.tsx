'use client';

import { PortableText, toPlainText } from '@portabletext/react';
import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '@/sanity/lib/image';
import type { PortableTextBlock } from '@portabletext/types';

interface ListItemProps {
  heading?: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  icon?: SanityImageSource;
}

interface ListProps {
  compact?: boolean;
  className?: string;
  items: ListItemProps[];
  columns?: 1 | 2 | 3 | 4;
  theme?:
    | 'default'
    | 'image-only'
    | 'snapshot'
    | 'cards'
    | 'cards-blue'
    | 'cards-white'
    | 'checks'
    | 'flags'
    | 'negatives'
    | 'positives'
    | 'good'
    | 'bad';
}

const defaultIcons: Record<string, string> = {
  checks: '/images/icon-list-check.png',
  negatives: '/images/icon-list-negative.png',
  positives: '/images/icon-list-check.png',
  good: '/images/icon-list-good.png',
  bad: '/images/icon-list-bad.png',
};

export default function List({
                               items,
                               columns = 2,
                               theme = 'default',
                               compact,
                               className
                             }: ListProps) {

  const colClass = `cols-${columns}`;

  const snapshotIcons = [
    '/images/icon-challenge.svg',
    '/images/icon-solution.svg',
    '/images/icon-impact.svg',
  ];

  const themeAllowsUploaded =
    theme === 'default' ||
    theme === 'image-only' ||
    theme === 'cards' ||
    theme === 'cards-white';

  const shouldShowImage = (item: ListItemProps) => {
    if (theme === 'snapshot') return true;
    if (theme === 'flags') return false;

    if (themeAllowsUploaded) {
      return !!item.icon;
    }

    return !!defaultIcons[theme];
  };

  const getImageUrl = (item: ListItemProps, index: number) => {
    if (theme === 'snapshot') return snapshotIcons[index];

    if (themeAllowsUploaded && item.icon) {
      return urlFor(item.icon).url();
    }

    return defaultIcons[theme];
  };

  return (
    <ul
      className={`list ${colClass} ${compact ? 'compact' : ''} ${className}`}
      data-theme={theme}
      role="list"
    >
      {items.map((item, i) => {
        const src = getImageUrl(item, i);

        return (
          <li key={i} className="list-item">
            {theme === 'flags' && <span className="flag-bar" />}

            {shouldShowImage(item) && src && (
              <div className="icon-wrapper">
                <Image
                  src={src}
                  alt={`Icon ${item.heading && '- ' + toPlainText(item.heading)}`}
                  fill
                />
              </div>
            )}

            {theme != 'image-only' && (
              <div className="list-content">
                {item.heading && (
                  <h4 className="heading">
                    <PortableText value={item.heading} />
                  </h4>
                )}

                {item.subheading && (
                  <h5 className="subheading">
                    <PortableText value={item.subheading} />
                  </h5>
                )}

                {item.body && (
                  <div>
                    <PortableText value={item.body} />
                  </div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
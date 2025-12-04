'use client';

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import type { PortableTextBlock } from '@portabletext/types';

interface ListItemProps {
  heading?: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  image?: { url: string; alt?: string };
}

interface ListProps {
  compact?: boolean;
  className?: string;
  items: ListItemProps[];
  columns?: 1 | 2 | 3;
  theme?: 'default' | 'snapshot' | 'cards' | 'cards-white' | 'checks' | 'flags' | 'negatives' | 'positives' | 'good' | 'bad';
}

const defaultIcons: Record<string, string> = {
  checks: '/images/icon-list-check.png',
  negatives: '/images/icon-list-negative.png',
  positives: '/images/icon-list-check.png',
  good: '/images/icon-list-good.png',
  bad: '/images/icon-list-bad.png',
};

export default function List({ items, columns = 2, theme = 'default', compact, className }: ListProps) {
  const colClass = `cols-${columns}`;

  const snapshotIcons = [
    '/images/icon-challenge.svg',
    '/images/icon-solution.svg',
    '/images/icon-impact.svg',
  ];

  const shouldShowImage = (item: ListItemProps) => {
    if (theme === 'snapshot') return true; // always show snapshot icons
    if (theme === 'flags') return false;
    if (['default', 'cards', 'cards-white'].includes(theme)) return !!item.image?.url;
    return !!defaultIcons[theme];
  };

  const getImageUrl = (item: ListItemProps, index: number) => {
    if (theme === 'snapshot') return snapshotIcons[index]; // use snapshot icon
    if (['default', 'cards', 'cards-white'].includes(theme) && item.image?.url) {
      return item.image.url;
    }
    return defaultIcons[theme];
  };


  return (
    <ul className={`list ${colClass} ${compact ? 'compact' : ''} ${className}`} data-theme={theme} role="list">
      {items.map((item, i) => (
        <li key={i} className="list-item">
          {theme === 'flags' && <span className="flag-bar" />}
          {shouldShowImage(item) && (
            <div className="icon-wrapper">
              <Image src={getImageUrl(item, i) || ''} alt={item.image?.alt || 'icon'} fill />
            </div>
          )}
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
        </li>
      ))}
    </ul>
  );
}

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
  items: ListItemProps[];
  columns?: 1 | 2 | 3;
  theme?: 'default' | 'cards' | 'cards-white' | 'checks' | 'flags' | 'negatives' | 'positives';
}

const defaultIcons: Record<string, string> = {
  checks: '/images/icon-list-check.png',
  negatives: '/images/icon-list-negative.png',
  positives: '/images/icon-list-check.png',
};

export default function List({ items, columns = 2, theme = 'default', compact }: ListProps) {
  const colClass = `cols-${columns}`;

  const shouldShowImage = (item: ListItemProps) => {
    if (theme === 'flags') return false;
    if (['default', 'cards', 'cards-white'].includes(theme)) return !!item.image?.url;
    return !!defaultIcons[theme];
  };

  const getImageUrl = (item: ListItemProps) => {
    if (['default', 'cards', 'cards-white'].includes(theme) && item.image?.url) {
      return item.image.url;
    }
    return defaultIcons[theme];
  };

  return (
    <ul className={`list ${colClass} ${compact ? 'compact' : ''}`} data-theme={theme} role="list">
      {items.map((item, i) => (
        <li key={i} className="list-item">
          {theme === 'flags' && <span className="flag-bar" />}
          {shouldShowImage(item) && (
            <div className="icon-wrapper">
              <Image src={getImageUrl(item) || ''} alt={item.image?.alt || ''} fill />
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

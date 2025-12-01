'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';

interface ListItemProps {
  heading?: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  body?: PortableTextBlock[];
  image?: { url: string; alt?: string }; // custom image for 'default', 'cards', 'cards-white' themes
}

interface ListProps {
  items: ListItemProps[];
  columns?: 1 | 2 | 3;
  theme?: 'default' | 'cards' | 'cards-white' | 'checks' | 'flags' | 'negatives' | 'positives';
}

const defaultIcons: Record<string, string> = {
  checks: '/images/icon-list-check.png',
  negatives: '/images/icon-list-negative.png',
  positives: '/images/icon-list-check.png',
};

export default function List({ items, columns = 2, theme = 'default' }: ListProps) {
  const getBgClasses = () => {
    switch (theme) {
      case 'cards':
        return 'bg-blue-600 text-white';
      case 'cards-white':
        return 'bg-white text-gray-900';
      case 'checks':
        return 'bg-green-50 text-green-900';
      case 'flags':
        return 'bg-red-50 text-red-900';
      case 'negatives':
        return 'bg-red-100 text-red-900';
      case 'positives':
        return 'bg-green-100 text-green-900';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  const getGridCols = () => {
    switch (columns) {
      case 3:
        return 'md:grid-cols-3';
      case 2:
        return 'md:grid-cols-2';
      default:
        return 'md:grid-cols-1';
    }
  };

  // Determine if we should show an image/icon
  const shouldShowImage = (item: ListItemProps) => {
    // For 'flags' theme, don't show any image/icon
    if (theme === 'flags') return false;

    // For 'default', 'cards', 'cards-white' - show custom image if provided
    if (['default', 'cards', 'cards-white'].includes(theme || '')) {
      return !!item.image?.url;
    }

    // For 'checks', 'negatives', 'positives' - show default icon
    if (theme && defaultIcons[theme]) {
      return true;
    }

    return false;
  };

  const getImageUrl = (item: ListItemProps) => {
    // Custom image takes priority for allowed themes
    if (['default', 'cards', 'cards-white'].includes(theme || '') && item.image?.url) {
      return item.image.url;
    }

    // Otherwise use default icon if available
    return theme && defaultIcons[theme];
  };

  return (
    <ul className={`mt-8 grid gap-6 ${getGridCols()}`} role="list">
      {items.map((item, i) => {
        const bgClasses = getBgClasses();
        const showImage = shouldShowImage(item);
        const imageUrl = getImageUrl(item);

        return (
          <li key={i} className={`flex items-start gap-4 rounded-lg p-4 ${bgClasses}`}>
            {/* Flag theme: colored bar instead of icon */}
            {theme === 'flags' && (
              <span
                className="inline-block h-full w-[10px] flex-shrink-0 rounded bg-red-600"
                style={{ alignSelf: 'stretch' }}
              />
            )}

            {/* Image/icon for other themes */}
            {showImage && imageUrl && (
              <div className="h-10 w-10 flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={item.image?.alt || ''}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            )}

            <div className="flex-1">
              {item.heading && (
                <h4 className="mb-1 font-semibold">
                  <PortableText value={item.heading} />
                </h4>
              )}
              {item.subheading && (
                <h5 className="mb-2">
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
        );
      })}
    </ul>
  );
}

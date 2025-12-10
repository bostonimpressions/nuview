'use client';

import { PortableText, toPlainText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import React from 'react';
import TextHeading from '@/components/ui/TextHeading';
import { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '@/sanity/lib/image';
import { usePathname } from 'next/navigation';

interface Props {
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  lead?: PortableTextBlock[];
  body?: PortableTextBlock[];
  backgroundType?: 'image' | 'video';
  backgroundImage?: SanityImageSource;
  backgroundVideo?: {
    asset: { url: string };
  };
  theme?: 'default' | 'service' | 'industry';
}

export default function SectionHeroSubpage({
                                             heading,
                                             subheading,
                                             lead,
                                             body,
                                             backgroundType,
                                             backgroundImage,
                                             backgroundVideo,
                                             theme = 'default',
                                           }: Props) {

  // get breadcrumb
  const pathname = usePathname();
  const headingText = toPlainText(heading);
  const section = pathname?.split('/').filter(Boolean)[0] ?? '';
  const sectionTitle = section
    ? section.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : '';
  const breadcrumb = `${sectionTitle} › ${headingText}`;


  // get bg url
  const backgroundImageUrl = backgroundImage
    ? urlFor(backgroundImage).width(1920).url()
    : undefined;

  const backgroundStyle =
    theme === 'default'
      ? {
        background:
          'radial-gradient(118.67% 95.24% at 91.36% 7.49%, #202C59 0%, #2A2A2A 100%)',
      }
      : theme === 'service'
        ? { backgroundColor: '#394FA2' }
        : {};

  const blendMode =
    theme === 'default'
      ? 'multiply'
      : theme === 'service'
        ? 'color-dodge'
        : 'normal';

  return (
    <section
      className="relative min-h-[600px] overflow-hidden py-[20] pb-[40] md:py-[60] text-white"
      style={backgroundStyle}
    >
      {/* IMAGE */}
      {backgroundType === 'image' && backgroundImageUrl && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            mixBlendMode: blendMode,
          }}
        />
      )}

      {/* VIDEO */}
      {backgroundType === 'video' && backgroundVideo?.asset?.url && (
        <video
          src={backgroundVideo.asset.url}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: 0.15,
            mixBlendMode: blendMode,
          }}
        />
      )}

      {/* CONTENT */}
      <div className="container relative z-10">

        {/* REQUIRED BREADCRUMB */}
        {breadcrumb && (
          <div className="mb-4 text-sm font-semibold text-white/80 tracking-wide">
            {breadcrumb}
          </div>
        )}

        <TextHeading color="text-white max-w-2xl">
          <PortableText
            value={heading}
            components={{
              marks: {
                highlight: ({ children }) => (
                  <span className="text-highlight">{children}</span>
                ),
              },
            }}
          />
        </TextHeading>

        {subheading && (
          <div className="mt-2 max-w-xl">
            <PortableText
              value={subheading}
              components={{
                block: {
                  normal: ({ children }) => <p className="text-white text-xl md:text-2xl font-semibold">{children}</p>,
                },
                marks: {
                  highlight: ({ children }) => (
                    <span className="text-highlight">{children}</span>
                  ),
                },
              }}
            />
          </div>
        )}

        {lead && (
          <div className="mt-4 max-w-lg">
            <PortableText
              value={lead}
              components={{
                block: {
                  normal: ({ children }) => <p className="text-white text-base md:text-lg font-semibold">{children}</p>,
                },
                marks: {
                  highlight: ({ children }) => (
                    <span className="text-highlight">{children}</span>
                  )
                }
              }}
            />
          </div>
        )}

        {body && (
          <div className="mt-6 max-w-lg">
            <PortableText
              value={body}
              components={{
                block: {
                  normal: ({ children }) => <p className="text-white text-sm">{children}</p>,
                },
                marks: {
                  highlight: ({ children }) => (
                    <span className="text-highlight">{children}</span>
                  ),
                  link: ({ value, children }) => (
                    <a
                      href={value?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

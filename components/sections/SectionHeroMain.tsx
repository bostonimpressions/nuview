'use client';

import { PortableText, PortableTextBlock } from '@portabletext/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Import your sanity client config
import { client } from '@/sanity/lib/client'; // Adjust path to your sanity client

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface Button {
  title: string;
  url: string;
  internal?: boolean;
}

interface Slide {
  label?: string;
  heading: PortableTextBlock[];
  body?: PortableTextBlock[];
  buttons?: Button[];
  theme?: 'default' | 'service';
  backgroundImage?: SanityImageSource; // Changed type
}

interface Props {
  slides: Slide[];
}

export default function HeroSection({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[current];

  // Get the properly formatted image URL
  const backgroundImageUrl = slide.backgroundImage
    ? urlFor(slide.backgroundImage).width(1920).url()
    : undefined;

  // Determine background based on theme
  const backgroundStyle =
    slide.theme === 'default'
      ? {
          background: 'radial-gradient(118.67% 95.24% at 91.36% 7.49%, #202C59 0%, #2A2A2A 100%)',
        }
      : slide.theme === 'service'
        ? {
            backgroundColor: '#394FA2',
          }
        : {};

  // Determine blend mode for the background image
  const blendMode =
    slide.theme === 'default' ? 'multiply' : slide.theme === 'service' ? 'color-dodge' : 'normal';

  return (
    <section
      className="relative min-h-[500] overflow-hidden py-[20] pb-[40] md:py-[60]"
      style={{ ...backgroundStyle }}
    >
      {/* Overlay the background image at 10% opacity with appropriate blend mode */}
      {backgroundImageUrl && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            mixBlendMode: blendMode,
          }}
        />
      )}

      {/* Optional gradient overlay */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full"></div>

      <div className="container relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            <div className="md:col-span-2">
              {slide.label && (
                <div className="mb-4 text-xl font-semibold text-white">{slide.label}</div>
              )}

              <h1 className="text-perano-500">
                <PortableText
                  value={slide.heading}
                  components={{
                    marks: {
                      highlight: ({ children }) => (
                        <span className="text-highlight">{children}</span>
                      ),
                    },
                  }}
                />
              </h1>

              {slide.body && (
                <div className="mb-6">
                  <PortableText
                    value={slide.body}
                    components={{
                      block: {
                        normal: ({ children }) => <p className="text-xl text-white">{children}</p>,
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

              {slide.buttons && (
                <div className="flex gap-2">
                  {slide.buttons.map((btn) => (
                    <a
                      key={btn.title}
                      href={btn.url}
                      className={btn.internal ? 'btn-primary-light' : 'btn-secondary-light'}
                    >
                      {btn.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

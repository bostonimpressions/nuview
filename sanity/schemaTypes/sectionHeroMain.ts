import { defineType, defineField } from 'sanity';
import { toPlainText } from '../../utils/toPlainText';

export default defineType({
  name: 'sectionHeroMain',
  title: 'Hero (main)',
  type: 'object',
  fields: [
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        defineField({
          name: 'heroSlide',
          title: 'Hero Slide',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'heading', title: 'Heading', type: 'blockContentMinimal' }),
            defineField({ name: 'body', title: 'Body', type: 'blockContentMinimal' }),
            defineField({
              name: 'buttons',
              title: 'Buttons',
              type: 'array',
              of: [
                defineField({
                  name: 'button',
                  title: 'Button',
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'url', title: 'URL', type: 'string' },
                    {
                      name: 'internal',
                      title: 'Internal link?',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                }),
              ],
              validation: (Rule) => Rule.max(2),
            }),
            defineField({
              name: 'theme',
              title: 'Theme',
              type: 'string',
              options: { list: ['default', 'service'], layout: 'radio' },
              initialValue: 'default',
            }),
            defineField({
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              label: 'label',
              heading: 'heading',
              theme: 'theme',
            },
            prepare({ heading, theme }) {
              // Use label if available, otherwise first text in heading
              const title = (heading && heading[0]?.children?.[0]?.text) || 'Untitled Slide';
              return {
                title,
                subtitle: theme || 'default',
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero (main)',
        subtitle: 'Hero slideshow',
      };
    },
  },
});

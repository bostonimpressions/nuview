// ./sanity/schemaTypes/servicePage.ts
import { defineType, defineField } from 'sanity';
import { orderRankField } from '@sanity/orderable-document-list';

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    orderRankField({
      type: 'servicePage', // Crucial: This must match the schema name
      newItemPosition: 'after', // Optional: Places new items at the bottom of the list automatically
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // hidden slug field generated from title
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          `services/${input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')}`,
      },
      // 💡 FIX: Use a function to make it readOnly ONLY if a slug exists
      // readOnly: ({ value }) => !!value?.current,
      // Remove all conflicting settings:
      // hidden: true,
      // validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'sectionHeroMain' },
        { type: 'sectionHeroSubpage' },
        { type: 'sectionOverview' },
        { type: 'sectionBanner' },
        { type: 'sectionFeatureList' },
        { type: 'sectionFeature' },
        { type: 'sectionSnapshots' },
        { type: 'sectionComparison' },
        { type: 'sectionCallToAction' },
      ],
    }),
  ],
});

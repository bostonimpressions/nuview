// ./sanity/schemaTypes/servicePage.ts
import { defineType, defineField } from 'sanity';

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true, // Hide this from the editor
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
            .replace(/[^\w\-]+/g, '')}`, // remove invalid chars
      },
      hidden: true, // editors don’t see it
      //validation: (Rule) => Rule.required(),
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

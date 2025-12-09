// ./sanity/schemaTypes/industryPage.ts
import { defineType, defineField } from 'sanity';
import { orderRankField } from '@sanity/orderable-document-list';

interface ServicePageDocument {
  slug?: {
    current?: string;
  };
}
export const industryPage = defineType({
  name: 'industryPage',
  title: 'Industry Page',
  type: 'document',
  fields: [
    orderRankField({
      type: 'industryPage',
      newItemPosition: 'after',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click "Generate" once to create the slug. Cannot be changed after to preserve SEO.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .slice(0, 96),
      },
      readOnly: ({ document }) => {
        const doc = document as ServicePageDocument;
        return !!doc?.slug?.current;
      },
      validation: (Rule) => Rule.required(),
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
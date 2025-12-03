import { defineType, defineField } from 'sanity';
import { toPlainText } from '../../utils/toPlainText';

export default defineType({
  name: 'sectionFeatureList',
  title: 'Feature List Section',
  type: 'object',
  fields: [
    // Main Section
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
    defineField({ name: 'heading', title: 'Heading', type: 'blockContentMinimal' }),

    // List Section
    defineField({
      name: 'list',
      title: 'List Section',
      type: 'object',
      fields: [
        {
          name: 'theme',
          title: 'Theme',
          type: 'string',
          options: {
            list: ['default', 'cards', 'cards-white', 'checks', 'flags', 'negatives', 'positives'],
            layout: 'radio',
          },
          initialValue: 'default',
        },
        {
          name: 'columns',
          title: 'Columns',
          type: 'number',
          options: {
            list: [
              { title: '1', value: 1 },
              { title: '2', value: 2 },
              { title: '3', value: 3 },
            ],
          },
          initialValue: 2,
        },
        {
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineField({
              name: 'item',
              title: 'Item',
              type: 'object',
              fields: [
                { name: 'heading', title: 'Heading', type: 'blockContentMinimal' },
                { name: 'subheading', title: 'Subheading', type: 'blockContentMinimal' },
                { name: 'body', title: 'Body', type: 'blockContent' },
                { name: 'icon', title: 'Icon', type: 'image', options: { hotspot: true } },
              ],
              preview: {
                select: {
                  titleHeading: 'heading',
                  titleBody: 'body',
                },
                prepare({ titleHeading, titleBody }) {
                  const title =
                    (titleHeading && toPlainText(titleHeading)) ||
                    (titleBody && toPlainText(titleBody)) ||
                    'List item';

                  return {
                    title,
                  };
                },
              },
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      titleValue: 'heading',
    },
    prepare({ titleValue }) {
      const plainTextTitle = toPlainText(titleValue);

      return {
        title: 'Feature List Section',
        subtitle: plainTextTitle,
      };
    },
  },
});

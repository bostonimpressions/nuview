import { defineType, defineField } from 'sanity';
import { toPlainText } from '@portabletext/react';

export default defineType({
  name: 'sectionOverview',
  title: 'Overview Section',
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
    defineField({ name: 'subheading', title: 'Subheading', type: 'blockContentMinimal' }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),

    // Optional image with layout/grid
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageLayout',
      title: 'Image Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Image Left', value: 'imgLeft' },
          { title: 'Image Right', value: 'imgRight' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => !parent?.image,
    }),
    defineField({
      name: 'imageGrid',
      title: 'Image Grid',
      type: 'string',
      options: {
        list: [
          { title: '1/1 (two equal columns)', value: '1/1' },
          { title: '2/3', value: '2/3' },
          { title: '3/2', value: '3/2' },
        ],
        layout: 'radio',
      },
      initialValue: '1/1',
      hidden: ({ parent }) => !parent?.image,
    }),

    defineField({
      name: 'listColumns',
      title: 'List Layout Columns (for multiple lists)',
      type: 'number',
      options: {
        list: [
          { title: '1 Column (stacked)', value: 1 },
          { title: '2 Columns', value: 2 },
        ],
        layout: 'radio',
      },
      initialValue: 1,
    }),

    // List Section
    defineField({
      name: 'lists',
      title: 'Lists',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'list',
          title: 'List Section',
          fields: [
            { name: 'heading', title: 'Heading', type: 'blockContentMinimal' },
            { name: 'subheading', title: 'Subheading', type: 'blockContentMinimal' },
            { name: 'body', title: 'Body', type: 'blockContent' },
            {
              name: 'theme',
              title: 'Theme',
              type: 'string',
              options: {
                list: [
                  'default',
                  'cards',
                  'cards-blue',
                  'cards-white',
                  'checks',
                  'flags',
                  'negatives',
                  'positives',
                ],
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
                  { title: '4', value: 4 },
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
                      heading: 'heading',
                      subheading: 'subheading',
                      body: 'body',
                    },
                    prepare({ heading, subheading, body }) {
                      const title =
                        (heading && toPlainText(heading)) ||
                        (subheading && toPlainText(subheading)) ||
                        (body && toPlainText(body)) ||
                        'List item';
                      return { title };
                    },
                  },
                }),
              ],
              initialValue: [],
            },
          ],
          preview: {
            select: {
              heading: 'heading',
              subheading: 'subheading',
              body: 'body',
            },
            prepare({ heading, subheading, body }) {
              const title =
                (heading && toPlainText(heading)) ||
                (subheading && toPlainText(subheading)) ||
                (body && toPlainText(body)) ||
                'List';
              return { title };
            },
          },

        }),
      ],
    }),

    // CTA Section
    defineField({
      name: 'cta',
      title: 'Call To Action',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'blockContentMinimal' },
        { name: 'body', title: 'Body', type: 'blockContent' },
        { name: 'icon', title: 'Icon', type: 'image', options: { hotspot: true } },
        { name: 'link', title: 'Link', type: 'url' },
      ],
    }),
  ],

  preview: {
    select: {
      titleValue: 'heading',
    },
    prepare({ titleValue }) {
      const plainTextTitle = titleValue ? toPlainText(titleValue) : '';

      return {
        title: 'Overview Section',
        subtitle: plainTextTitle || 'Overview Section',
      };
    },
  },
});

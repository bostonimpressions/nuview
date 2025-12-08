import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Blog pages
      S.listItem().title('Blog pages').child(S.documentTypeList('blogPage').title('Blog pages')),

      // Service pages
      S.listItem()
        .title('Service pages')
        .child(
          S.documentTypeList('servicePage')
            .title('Service Pages')
            .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
        ),

      S.divider(),

      // Fallback: all other document types
      ...S.documentTypeListItems().filter(
        (item) => !['blogPage', 'servicePage'].includes(item.getId() || '')
      ),
    ]);

import type { StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Blog pages
      S.listItem().title('Blog pages').child(S.documentTypeList('blogPage').title('Blog pages')),

      // Service pages (Custom Order)
      orderableDocumentListDeskItem({
        type: 'servicePage',
        title: 'Service pages',
        S,
        context,
        id: 'servicePage.orderable',
      }),

      S.divider(),

      // Fallback: all other document types
      ...S.documentTypeListItems().filter(
        (item) => !['blogPage', 'servicePage'].includes(item.getId() || '')
      ),
    ]);

import { type SchemaTypeDefinition } from 'sanity';
import page from './page';
import blockContent from './blockContent';
import blockContentMinimal from './blockContentMinimal';
import sectionHeroMain from './sectionHeroMain';
import sectionHeroSubpage from './sectionHeroSubpage';
import sectionOverview from './sectionOverview';
import sectionBanner from './sectionBanner';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page,
    blockContent,
    blockContentMinimal,
    sectionHeroMain,
    sectionHeroSubpage,
    sectionOverview,
    sectionBanner,
  ],
};

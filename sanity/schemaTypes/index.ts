import { type SchemaTypeDefinition } from 'sanity';
import page from './page';
import blockContent from './blockContent';
import blockContentMinimal from './blockContentMinimal';
import sectionHeroMain from './sectionHeroMain';
import sectionHeroSubpage from './sectionHeroSubpage';
import sectionOverview from './sectionOverview';
import sectionBanner from './sectionBanner';
import sectionFeatureList from './sectionFeatureList';
import sectionFeature from './sectionFeature';
import sectionSnapshots from './sectionSnapshots';
import sectionComparison from './sectionComparison';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page,
    blockContent,
    blockContentMinimal,
    sectionHeroMain,
    sectionHeroSubpage,
    sectionOverview,
    sectionBanner,
    sectionFeatureList,
    sectionFeature,
    sectionSnapshots,
    sectionComparison,
  ],
};

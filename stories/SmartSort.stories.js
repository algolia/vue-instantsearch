import algoliasearch from 'algoliasearch/lite';
import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

storiesOf('ais-smart-sort', module)
  .addDecorator(
    previewWrapper({
      searchClient: algoliasearch(
        'C7RIRJRYR9',
        '77af6d5ffb27caa5ff4937099fcb92e8'
      ),
      indexName: 'test_Bestbuy_vr_price_asc',
    })
  )
  .add('default', () => ({
    template: '<ais-smart-sort></ais-smart-sort>',
  }))
  .add('with custom text', () => ({
    template: `
      <ais-smart-sort>
        <template slot="text" slot-scope="{ isSmartSorted }">
          {{ isSmartSorted
               ? 'We removed some search results to show you the most relevant ones'
               : 'Currently showing all results' }}
        </template>
      </ais-smart-sort>
    `,
  }));

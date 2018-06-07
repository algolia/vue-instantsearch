import { customPreviewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('RatingMenu', module)
  .addDecorator(
    customPreviewWrapper({
      hits: `
        <div slot="item" slot-scope="{ item }">
          <h2>rating: {{item.rating}}</h2>
          <p>{{item.name}}</p>
        </div>`,
      indexName: 'instant_search_rating_asc',
    })
  )
  .add('default', () => ({
    template: `
      <div>
        <ais-rating-menu attribute="rating">
        </ais-rating-menu>
      </div>`,
  }));

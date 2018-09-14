import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('GeoSearch', module)
  .addDecorator(
    previewWrapper({
      indexName: 'airbnb',
      hits: `
      <ol
        slot-scope="{ items }"
        class="playground-hits"
      >
        <li
          v-for="item in items"
          :key="item.objectID"
          class="playground-hits-item"
        >
          <div
            class="playground-hits-image"
            :style="{ backgroundImage: 'url(' + item.thumbnail_url + ')' }"
          />
          <div class="playground-hits-desc">
            <p>
              <ais-highlight attribute="name" :hit="item" />
            </p>
            <p>Type: {{ item.room_type }}</p>
            <p>Price: {{ item.price }}$</p>
          </div>
        </li>
      </ol>
      `,
      filters: `<ais-refinement-list attribute="property_type" />`,
    })
  )
  .add('simple usage', () => ({
    template: `<ais-geo-search />`,
  }))
  .add('no refine on map move', () => ({
    template: `
      <ais-geo-search
        :enable-refine-on-map-move="false" 
      />
    `,
  }))
  .add('custom rendering', () => ({
    template: `
      <ais-geo-search>
        <template slot-scope="{ items }">
          <div
            v-for="item in items"
            :key="item.objectID"
          >
            {{item.name}}
            <pre>{{item._geoloc}}</pre>
          </div>
        </template>
      </ais-geo-search>
    `,
  }));

import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';
import { action } from '@storybook/addon-actions';

storiesOf('ais-hits', module)
  .addDecorator(previewWrapper())
  .add('simple usage', () => ({
    template: `<ais-hits></ais-hits>`,
  }))
  .add('with transform items', () => ({
    template: `
      <ais-hits :transform-items="transformItems">
        <div slot="item" slot-scope="{ item }">
          <h2>{{item.name}}</h2>
        </div>
      </ais-hits>
    `,
    methods: {
      transformItems(items) {
        return items.map(item =>
          Object.assign({}, item, {
            name: item.name.toUpperCase(),
          })
        );
      },
    },
  }))
  .add('custom rendering', () => ({
    template: `
    <ais-hits>
      <div slot="item" slot-scope="{ item }">
        <marquee>before one</marquee>
        <h2>{{item.name}}</h2>
        <small>{{item.description}}</small>
      </div>
    </ais-hits>
  `,
  }))
  .add('custom rendering (all)', () => ({
    template: `
    <ais-hits>
      <div slot-scope="{ items }">
        <marquee>before everything</marquee>
        <div
          v-for="item in items"
          :key="item.objectID"
        >
          custom objectID: {{item.objectID}}
        </div>
      </div>
    </ais-hits>`,
  }))
  .add('with a Panel', () => ({
    template: `
      <ais-panel>
        <template slot="header">Hits</template>
        <ais-hits />
        <template slot="footer">Footer</template>
      </ais-panel>
    `,
  }));

storiesOf('ais-hits', module)
  .addDecorator(
    previewWrapper({
      insightsClient: (method, payload) =>
        action(`[InsightsClient] sent ${method} with payload`)(payload),
    })
  )
  .add('with insights default slot', () => ({
    template: `
      <div>
        <ais-configure :clickAnalytics="true" />
        <ais-hits>
          <div slot-scope="{ items, insights }">
            <div
              v-for="item in items"
              :key="item.objectID"
            >
              custom objectID: {{item.objectID}}
              <button @click="insights('clickedObjectIDsAfterSearch', { eventName: 'Add to cart', objectIDs: [item.objectID] })">Add to cart</button>
            </div>
          </div>
        </ais-hits>
      </div>
    `,
  }))
  .add('with insights with item slot', () => ({
    template: `
      <div>
        <ais-configure :clickAnalytics="true" />
        <ais-hits>
          <div slot="item" slot-scope="{ item, insights }">
            custom objectID: {{item.objectID}}
            <button @click="insights('clickedObjectIDsAfterSearch', { eventName: 'Add to cart', objectIDs: [item.objectID] })">Add to cart</button>
          </div>
        </ais-hits>
      </div>
    `,
  }));

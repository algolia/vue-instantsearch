import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';
import { MemoryRouter } from './MemoryRouter';
import { simple } from 'instantsearch.js/es/lib/stateMappings';

storiesOf('ais-infinite-hits', module)
  .addDecorator(previewWrapper())
  .add('simple usage', () => ({
    template: `<ais-infinite-hits />`,
  }))
  .add('with transform items', () => ({
    template: `
      <ais-infinite-hits :transform-items="transformItems">
        <div slot="item" slot-scope="{ item, index }">
          {{item.name}} - {{index}}
        </div>
      </ais-infinite-hits>
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
  .add('with a custom render', () => ({
    template: `
      <ais-infinite-hits>
        <div slot-scope="{ items, isLastPage, refine }">
          <div
            v-for="(item, index) in items"
            :key="item.objectID"
          >
            {{item.name}}
          </div>

          <button
            :disabled="isLastPage"
            @click="refine"
          >
            Load more
          </button>
        </div>
      </ais-infinite-hits>
    `,
  }))
  .add('with a custom item render', () => ({
    template: `
      <ais-infinite-hits>
        <div slot="item" slot-scope="{ item, index }">
          {{item.name}} - {{index}}
        </div>
      </ais-infinite-hits>
    `,
  }))
  .add('with a custom show more render', () => ({
    template: `
      <ais-infinite-hits>
        <div slot="loadMore" slot-scope="{ refine, page, isLastPage }">
          <button
            :disabled="isLastPage"
            @click="refine"
          >
            Gimme {{ isLastPage ? "nothing anymore" : "page " + (page + 2) }}!
          </button>
        </div>
      </ais-infinite-hits>
    `,
  }))
  .add('with a disabled button', () => ({
    template: `
      <div>
        <ais-configure query="dsdsds" />
        <ais-infinite-hits />
      </div>
    `,
  }))
  .add('with a Panel', () => ({
    template: `
      <ais-panel>
        <template slot="header">Infinite Hits</template>
        <ais-infinite-hits />
        <template slot="footer">Footer</template>
      </ais-panel>
    `,
  }));

storiesOf('ais-infinite-hits', module)
  .addDecorator(previewWrapper({
    routing: {
      router: new MemoryRouter({page: 3}),
      stateMapping: simple()
    },
  }))
  .add('with show previous enabled', () => ({
    template: `
      <ais-infinite-hits :show-previous=true></ais-infinite-hits>`,
  }))
  .add('with a custom show previous render', () => ({
    template: `
      <ais-infinite-hits :show-previous=true>
        <div slot="loadPrevious" slot-scope="{ refinePrevious, page, isFirstPage }">
          <button
            :disabled="isFirstPage"
            @click="refinePrevious"
          >
            Gimme {{ isFirstPage ? "nothing anymore" : "previous page" }}!
          </button>
        </div>
      </ais-infinite-hits>`,
  }));

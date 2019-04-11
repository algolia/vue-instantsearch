import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('ais-query-rule-custom-data', module)
  .addDecorator(
    previewWrapper({
      indexName: 'instant_search_movies',
      filters: '<ais-refinement-list attribute="genre" />',
      hits: `
      <ol slot-scope="{ items }" class="playground-hits">
        <li
          v-for="item in items"
          :key="item.objectID"
          class="playground-hits-item"
        >
          <div
            class="playground-hits-image"
            :style="{ backgroundImage: 'url(' + item.image + ')' }"
          />
          <article>
            <header>
              <strong><ais-highlight attribute="title" :hit="item"/></strong>
            </header>
          </article>
        </li>
      </ol>
      `,
    })
  )
  .add('simple usage', () => ({
    template: `
    <div>
      <p>
        Type <q>music</q> and a banner will appear.
      </p>
      <ais-query-rule-custom-data>
        <template slot="item" slot-scope="{ item }">
          <h2>{{ item.title }}</h2>
          <a :href="item.link">
            <img
              :src="item.banner"
              :alt="item.title"
              :style="{ width: '100%' }"
            />
          </a>
        </template>
      </ais-query-rule-custom-data>
    </div>
    `,
  }))
  .add('with default banner', () => ({
    template: `
    <div>
      <p>
        Kill Bill appears whenever no other results are promoted. Type
        <q>music</q> to see another movie promoted.
      </p>
      <ais-query-rule-custom-data :transform-items="transformItems">
        <template slot="item" slot-scope="{ item }">
          <h2>{{ item.title }}</h2>
          <a :href="item.link">
            <img
              :src="item.banner"
              :alt="item.title"
              :style="{ width: '100%' }"
            />
          </a>
        </template>
      </ais-query-rule-custom-data>
    </div>
    `,
    data() {
      return {
        transformItems: items => {
          if (items.length > 0) {
            return [items[0]];
          }

          return [
            {
              title: 'Kill Bill',
              banner: 'http://static.bobatv.net/IMovie/mv_2352/poster_2352.jpg',
              link: 'https://www.netflix.com/title/60031236',
            },
          ];
        },
      };
    },
  }))
  .add('picking first with transform', () => ({
    template: `
    <div>
      <p>
        Type <q>music</q> and a banner will appear.
      </p>
      <ais-query-rule-custom-data
        :transform-items="transformItems"
      />
    </div>`,
    data() {
      return {
        transformItems: items => [items[0]],
      };
    },
  }))
  .add('keeping only banners with transform', () => ({
    template: `
    <div>
      <p>
        Type <q>not a banner</q> and nothing will appear.
      </p>
      <ais-query-rule-custom-data
        :transform-items="transformItems"
      />
    </div>`,
    data() {
      return {
        transformItems: items =>
          items.filter(item => item.banner !== undefined),
      };
    },
  }));

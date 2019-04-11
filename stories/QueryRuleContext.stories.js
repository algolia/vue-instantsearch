import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('ais-query-rule-context', module)
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
      <ul>
        <li>Select the "Drama" category and The Shawshank Redemption appears</li>
        <li>Select the "Thriller" category and Pulp Fiction appears</li>
        <li>Type <q>music</q> and a banner will appear.</li>
      </ul>
      <ais-query-rule-context :tracked-filters="trackedFilters" />
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
    </div>`,
    data() {
      return {
        trackedFilters: {
          genre: () => ['Thriller', 'Drama'],
        },
      };
    },
  }))
  .add('with initial filter applied', () => ({
    template: `
    <div>
      <ul>
        <li>Select the "Drama" category and The Shawshank Redemption appears</li>
        <li>Select the "Thriller" category and Pulp Fiction appears</li>
        <li>Type <q>music</q> and a banner will appear.</li>
      </ul>
      <ais-configure
        :disjunctive-facets-refinements.camel="{
          genre: ['Drama']
        }"
      />
      <ais-query-rule-context :tracked-filters="trackedFilters" />
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
    data() {
      return {
        trackedFilters: {
          genre: () => ['Thriller', 'Drama'],
        },
      };
    },
  }))
  .add('with filter out "thriller" in generated rules', () => ({
    template: `
    <div>
      <ul>
        <li>Select the "Drama" category and The Shawshank Redemption appears</li>
        <li>Select the "Thriller" category and Pulp Fiction does not appear</li>
        <li>Type <q>music</q> and a banner will appear.</li>
      </ul>
      <ais-configure
        :disjunctive-facets-refinements.camel="{
          genre: ['Drama']
        }"
      />
      <ais-query-rule-context
        :tracked-filters="trackedFilters"
        :transform-rule-contexts="transformRuleContexts"
      />
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
    data() {
      return {
        trackedFilters: {
          genre: values => values,
        },
        transformRuleContexts: rules =>
          rules.filter(rule => rule.indexOf('Thriller') < 0),
      };
    },
  }));

<template>
  <ais-instant-search-ssr>
    <ais-index
      index-name="instant_search_demo_query_suggestions"
      index-id="querySuggestions"
    >
      <ais-search-box />
      <ais-configure :hits-per-page.camel="5" />
      <ais-hits>
        <template
          slot="item"
          slot-scope="{ item }"
        >
          <ais-highlight
            attribute="query"
            :hit="item"
          />
        </template>
      </ais-hits>
      <ais-pagination />
    </ais-index>
    <ais-search-box />
    <ais-stats />
    <ais-index
      index-id="refinement"
      index-name="instant_search"
    >
      <ais-refinement-list attribute="brand" />
    </ais-index>
    <ais-hits>
      <template
        slot="item"
        slot-scope="{ item }"
      >
        <p>
          <ais-highlight
            attribute="name"
            :hit="item"
          />
        </p>
        <p>
          <ais-highlight
            attribute="brand"
            :hit="item"
          />
        </p>
      </template>
    </ais-hits>
    <ais-pagination />
  </ais-instant-search-ssr>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisIndex,
  AisConfigure,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
  createInstantSearch,
} from 'vue-instantsearch';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

if (typeof window === 'object') {
  window.client = searchClient;
}

const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'instant_search',
  initialUiState: {
    instant_search: {
      query: 'iphone',
      page: 3,
    },
    refinement: {
      refinementList: {
        brand: ['Apple'],
      },
    },
    querySuggestions: {
      query: 'k',
      page: 2,
      configure: {
        hitsPerPage: 5,
      },
    },
  },
});

export default {
  asyncData() {
    return instantsearch
      .findResultsState({
        instant_search: {
          index: 'instant_search',
          query: 'iphone',
          page: 2,
        },
        refinement: {
          index: 'instant_search',
          disjunctiveFacets: ['brand'],
          disjunctiveFacetsRefinements: { brand: ['Apple'] },
          // TODO: is this merging needed here? we don't know the shape so I think so.
          query: 'iphone',
          page: 2,
        },
        querySuggestions: {
          index: 'instant_search_demo_query_suggestions',
          query: 'k',
          hitsPerPage: 5,
          page: 1,
        },
      })
      .then(() => ({
        algoliaState: instantsearch.getState(),
      }));
  },
  beforeMount() {
    // Nuxt will merge `asyncData` and `data` on the client
    instantsearch.hydrate(this.algoliaState);
  },
  mixins: [rootMixin],
  components: {
    AisInstantSearchSsr,
    AisIndex,
    AisConfigure,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://unpkg.com/instantsearch.css@7.1.0/themes/algolia-min.css',
        },
      ],
    };
  },
};
</script>

<style>
.ais-Hits-list {
  text-align: left;
}
.ais-Hits-list:empty {
  margin: 0;
}
.ais-InstantSearch {
  margin: 1em;
}
</style>

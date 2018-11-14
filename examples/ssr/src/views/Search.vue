<template>
  <AisInstantSearch :search-client="searchClient" index-name="movies">
    <AisSearchBox />
    <AisStats />
    <AisHits>
      <template slot="item" slot-scope="{ item }">
        <AisHighlight attribute="title" :hit="item" />
        <p class="year">{{ item.year }}</p>
        <p class="genre">
          <span v-for="genre in item.genre" :key="genre" class="badge">
            {{ genre }}
          </span>
        </p>
      </template>
    </AisHits>
  </AisInstantSearch>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import {
  AisInstantSearch,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
} from 'vue-instantsearch';

export default {
  components: {
    AisInstantSearch,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
  },
  data() {
    return {
      searchClient: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ),
    };
  },
};
</script>

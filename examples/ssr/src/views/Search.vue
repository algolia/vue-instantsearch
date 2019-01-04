<template>
  <AisInstantSearchSsr>
    <AisSearchBox />
    <AisStats />
    <AisRefinementList attribute="genre"/>
    <AisHits>
      <template
        slot="item"
        slot-scope="{ item }"
      >
        <AisHighlight
          attribute="title"
          :hit="item"
        />
        <p class="year">{{ item.year }}</p>
        <p class="genre">
          <span
            v-for="genre in item.genre"
            :key="genre"
            class="badge"
          >
            {{ genre }}
          </span>
        </p>
      </template>
    </AisHits>
  </AisInstantSearchSsr>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
} from '../../../../src/instantsearch.js';

export default {
  asyncData({ instantsearch }) {
    return instantsearch.ssr({
      query: 'hi',
      hitsPerPage: 5,
      disjunctiveFacets: ['genre'],
      disjunctiveFacetsRefinements: {genre: ['Comedy']},
    });
  },
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
  },
};
</script>

<style>
.ais-Hits-list {
  text-align: left;
}
</style>

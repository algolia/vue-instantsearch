<template>
  <AisSsr>
    <AisSearchBox />
    <AisStats />
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
  </AisSsr>
</template>

<script>
import {
  AisSsr,
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
    });
  },
  components: {
    AisSsr,
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

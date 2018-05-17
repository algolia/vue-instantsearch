<template>
  <div :class="bem()" v-if="totalResults > 0">
    <slot :totalResults="totalResults" :processingTime="processingTime" :query="query" :resultStart="resultStart" :resultEnd="resultEnd">
      Showing {{ resultStart.toLocaleString() }} - {{ resultEnd.toLocaleString() }} of {{ totalResults.toLocaleString() }},
      took {{ processingTime.toLocaleString() }}ms
    </slot>
  </div>
</template>

<script>
import algoliaComponent from '../component';

export default {
  mixins: [algoliaComponent],
  data() {
    return {
      blockClassName: 'ais-stats',
    };
  },
  computed: {
    query() {
      return this.searchStore.query;
    },
    totalResults() {
      return this.searchStore.totalResults;
    },
    processingTime() {
      return this.searchStore.processingTimeMS;
    },
    resultStart() {
      return (this.searchStore.page - 1) * this.searchStore.resultsPerPage + 1;
    },
    resultEnd() {
      return this.resultStart + this.searchStore.results.length - 1;
    },
  },
};
</script>

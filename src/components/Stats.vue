<template>
  <div :class="bem()" v-if="totalResults > 0">
    <slot :totalResults="totalResults" :processingTime="processingTime" :query="query" :resultStart="resultStart" :resultEnd="resultEnd">
      {{ totalResults.toLocaleString() }} results found in {{ processingTime.toLocaleString() }}ms
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
      if(!this.searchStore || !this.searchStore.page || !this.searchStore.resultsPerPage)
        return undefined
      
      return (this.searchStore.page - 1) * this.searchStore.resultsPerPage + 1;
    },
    resultEnd() {
      if(!this.resultStart || !this.searchStore || !this.searchStore.results)
        return undefined
      
      return this.resultStart + this.searchStore.results.length - 1;
    },
  },
};
</script>

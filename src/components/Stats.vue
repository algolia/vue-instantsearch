<template>
  <div class="ais-Stats">
    <span class="ais-Stats-text">
      <slot v-bind="state">
        {{ state.nbHits.toLocaleString() }} results found in {{ state.processingTimeMS.toLocaleString() }}ms
      </slot>
    </span>
  </div>
</template>

<script>
import algoliaComponent from '../component';
import { connectStats } from 'instantsearch.js/es/connectors';
const connect__Template = (renderFn, unmountFn) => ({ someProp }) => ({
  render: () => renderFn(),
});

export default {
  mixins: [algoliaComponent],
  props: {
  },
  data() {
    return {
      widgetName: 'ais-stats',
    };
  },
  beforeCreate() {
    this.connector = connectStats;
  },
  computed: {
    widgetParams() {},
  },
};
</script>

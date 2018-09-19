<template>
  <div
    v-if="state"
    :class="suit()"
  >
    <slot
      v-bind="state"
      :results="state.instantSearchInstance.helper.lastResults"
    >
      <span :class="suit('text')">
        {{ state.nbHits.toLocaleString() }} results found in {{ state.processingTimeMS.toLocaleString() }}ms
      </span>
    </slot>
  </div>
</template>

<script>
import algoliaComponent from '../mixins/component';
import { connectStats } from 'instantsearch.js/es/connectors';
import { createSuitMixin } from '../mixins/suit';

export default {
  mixins: [algoliaComponent, createSuitMixin({ name: 'Stats' })],
  beforeCreate() {
    this.connector = connectStats;
  },
  computed: {
    widgetParams() {
      return {};
    },
  },
};
</script>

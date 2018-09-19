<template>
  <div
    v-if="state"
    :class="suit()"
  >
    <slot
      :refine="state.refine"
      :searchParameters="state.widgetParams.searchParameters"
    />
  </div>
</template>

<script>
import algoliaComponent from '../mixins/component';
import { connectConfigure } from 'instantsearch.js/es/connectors';
import { createSuitMixin } from '../mixins/suit';

export default {
  mixins: [algoliaComponent, createSuitMixin({ name: 'Configure' })],
  beforeCreate() {
    this.connector = connectConfigure;
  },
  computed: {
    widgetParams() {
      return {
        searchParameters: this.$attrs,
      };
    },
  },
};
</script>

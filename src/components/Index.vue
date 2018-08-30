<template>
  <!-- Index is an empty component that will hold other widgets -->
  <div :class="suit()">
    <slot />
  </div>
</template>

<script>
import instantsearch from 'instantsearch.js/es/';
import suit from '../suit';

export default {
  provide() {
    this.instantSearchInstance = instantsearch({
      indexName: this.indexName,
      routing: this.routing,
      stalledSearchDelay: this.stalledSearchDelay,
      searchFunction: this.searchFunction,
      searchParameters: this.searchParameters,
    });

    return {
      instantSearchInstance: this.instantSearchInstance,
    };
  },
  props: {
    searchClient: {
      type: Object,
      required: true,
    },
    indexName: {
      type: String,
      required: true,
    },
    routing: {
      type: [Boolean, Object],
      default: null,
    },
    stalledSearchDelay: {
      type: Number,
      default: 200,
    },
    searchFunction: {
      type: Function,
      default: null
    },
    searchParameters: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      widgetName: 'Index',
    };
  },
  mounted() {
    // from the documentation: https://vuejs.org/v2/api/#mounted
    // "Note that mounted does not guarantee that all child components have also been mounted. If you want to
    // wait until the entire view has been rendered, you can use vm.$nextTick inside of mounted"
    this.$nextTick(() => {
      this.instantSearchInstance.start();
    });
  },
  methods: {
    suit(...args) {
      return suit(this.widgetName, ...args);
    },
  },
};
</script>

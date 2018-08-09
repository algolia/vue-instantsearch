<template>
  <div :class="suit()">
    <slot>
      Hello
    </slot>
  </div>
</template>

<script>
import algoliaComponent from '../component';
import { connectNumericRefinementList } from 'instantsearch.js/es/connectors';

export default {
  mixins: [algoliaComponent],
  props: {
    someProp: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      widgetName: 'NumericMenu',
    };
  },
  beforeCreate() {
    this.connector = connectNumericRefinementList;
  },
  computed: {
    widgetParams() {
      return {
        someProp: this.someProp,
      };
    },
  },
};</script>

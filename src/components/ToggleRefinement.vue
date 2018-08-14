<template>
  <div :class="suit('')">
    <slot>
      Hello from ToggleRefinement
    </slot>
  </div>
</template>

<script>
import { connectToggle } from 'instantsearch.js/es/connectors';
import algoliaComponent from '../component';

export default {
  mixins: [algoliaComponent],
  props: {},
  data() {
    return {
      widgetName: 'ToggleRefinement',
    };
  },
  beforeCreate() {
    this.connector = connectToggle;
  },
  computed: {
    widgetParams() {
      return {};
    },
  },
};</script>

<template>
<div v-if="state" :class="suit()">
  <form :class="suit('form')">
    <label :class="suit('label')">
      <input :class="[suit('input'), suit('input', 'min')]" type="number" />
    </label>
    <span :class="suit('separator')">to</span>
    <label :class="suit('label')">
      <input :class="[suit('input'), suit('input', 'max')]" type="number" />
    </label>
    <button :class="suit('submit')" type="submit">Go</button>
  </form>
</div>
</template>

<script>
import JsonTree from 'vue-json-tree'; // 👈 When done, remove this
import algoliaComponent from '../component';
// Uncomment and change here ⬇️
import { connectRange } from 'instantsearch.js/es/connectors';

/* eslint-disable no-unused-vars */
// Remove this part ⬇,️ only here for testing the template
const connectorName = (renderFn, unmountFn) => ({ someProp }) => ({
  render: () => renderFn(),
});
/* eslint-enable */

export default {
  // ⬇️ this is to help you debugging what's in `state`
  // remove it before pushing the component
  components: { 'json-tree': JsonTree },
  mixins: [algoliaComponent],
  // ⬇️ Those are all the options of your widget (attribute, items ...)
  // You don't need to write down the props that will be forwarded by the connector on render,
  // They are directly accessible in the state in template
  props: {
    attributeName: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
    precision: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      widgetName: 'RangeInput',
    };
  },
  beforeCreate() {
    this.connector = connectRange;
  },
  computed: {
    // ⬇️ Those are all the options of your widget (attribute, items ...)
    // Same as props, just do the mapping
    widgetParams() {
      return {
        attributeName: this.attributeName,
        min: this.min,
        max: this.max,
        precision: this.precision,
      };
    },
  },
};</script>

<template>
<div v-if="state" :class="suit()">
  <slot
    :currentRefinements="this.state.start"
    :refine="this.refine"
  >
  <form :class="suit('form')" @submit.prevent="refine(minInput, maxInput)">
    <label :class="suit('label')">
      <input :class="[suit('input'), suit('input', 'min')]" type="number" :min="this.min"  :placeholder="this.min" :value="this.state.start && this.state.start[0]" @change="minInput = $event.currentTarget.value"/>
    </label>
    <span :class="suit('separator')">to</span>
    <label :class="suit('label')">
      <input :class="[suit('input'), suit('input', 'max')]" type="number" :max="this.max"  :placeholder="this.max" :value="this.state.start && this.state.start[1]" @change="maxInput = $event.currentTarget.value"/>
    </label>
    <button :class="suit('submit')" type="submit">Go</button>
  </form>
  </slot>
</div>
</template>

<script>
import algoliaComponent from '../component';
import { connectRange } from 'instantsearch.js/es/connectors';

export default {
  mixins: [algoliaComponent],
  props: {
    attribute: {
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
      minInput: undefined,
      maxInput: undefined,
    };
  },
  beforeCreate() {
    this.connector = connectRange;
  },
  computed: {
    widgetParams() {
      return {
        attributeName: this.attribute,
        min: this.min,
        max: this.max,
        precision: this.precision,
      };
    },
  },
  methods: {
    refine(min, max) {
      const minValue = min && parseInt(min, 10);
      const maxValue = max && parseInt(max, 10);

      this.state.refine([minValue, maxValue]);
    },
  },
};
</script>

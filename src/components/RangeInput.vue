<template>
<div v-if="state" :class="suit()">
  <form :class="suit('form')" @submit.prevent="refine()">
    <label :class="suit('label')">
      <input :class="[suit('input'), suit('input', 'min')]" type="number" v-model="minInput" :min="this.min" :max="this.maxInput" :placeholder="this.min"/>
    </label>
    <span :class="suit('separator')">to</span>
    <label :class="suit('label')">
      <input :class="[suit('input'), suit('input', 'max')]" type="number" v-model="maxInput" :max="this.max" :min="this.minInput" :placeholder="this.max"/>
    </label>
    <button :class="suit('submit')" type="submit">Go</button>
  </form>
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
    refine() {
      const minValue = this.minInput && parseInt(this.minInput, 10);
      const maxValue = this.maxInput && parseInt(this.maxInput, 10);

      this.state.refine([minValue, maxValue]);
    }
  },
};</script>

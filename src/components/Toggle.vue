<template>
  <label :class="isRefined ? bem('label', 'active') : bem('label')">
    <input type="checkbox" :class="bem('checkbox')" v-model="isRefined"> 
    <slot :label="label" :count="count" :active="isRefined">
      <span :class="bem('label')">{{ label }}</span>
      <span :class="bem('count')">{{ count }}</span>
    </slot>
  </label>
</template>

<script>import { FACET_OR } from '../store';
import algoliaComponent from '../component';

export default {
  mixins: [algoliaComponent],
  props: {
    attributeName: {
      type: String,
      required: true,
    },
    value: {
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      blockClassName: 'ais-toggle',
    };
  },
  created() {
    this.searchStore.addFacet(this.attributeName, FACET_OR);
  },
  destroyed() {
    this.searchStore.removeFacet(this.attributeName);
  },
  computed: {
    facetValue() {
      return this.searchStore.getFacetValue(this.attributeName, this.value);
    },
    isRefined: {
      set(value) {
        if (value === true) {
          this.enable();
        } else {
          this.disable();
        }
      },
      get() {
        return this.facetValue.isRefined;
      },
    },
    count() {
      return this.facetValue.count;
    },
  },
  methods: {
    enable() {
      this.searchStore.addFacetRefinement(this.attributeName, this.value);
    },
    disable() {
      this.searchStore.removeFacetRefinement(this.attributeName, this.value);
    },
  },
};
</script>

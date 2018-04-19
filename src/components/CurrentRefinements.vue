<template>
  <div :class="suit('')" v-if="state">
    <slot v-bind="state">
      <ul :class="suit('list')">
        <li v-for="item in state.refinements" :key="item.attributeName">
          <span :class="suit('item')">
            <span :class="suit('label')">{{item.attributeName | capitalize}}: {{item.computedLabel}}</span>
            <button :class="suit('delete')" @click="state.refine(item)">✕</button>
          </span>
        </li>
      </ul>
      <button :class="suit('reset')" @click="state.clearAllClick()" v-if="state.refinements.length > 0">
        Clear all
      </button>
    </slot>
  </div>
</template>

<script>
import algoliaComponent from '../component';
import { connectCurrentRefinedValues } from 'instantsearch.js/es/connectors';

export default {
  mixins: [algoliaComponent],
  props: {
    attributes: {
      type: Array,
      required: false,
    },
    clearsQuery: {
      type: Boolean,
      default: false,
      required: false,
    },
    transformItems: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      widgetName: 'CurrentRefinements',
    };
  },
  beforeCreate() {
    this.connector = connectCurrentRefinedValues;
  },
  computed: {
    widgetParams() {
      return {
        attributes: this.attributes,
        clearsQuery: this.clearsQuery,
        onlyListedAttributes: this.listedAttributes,
      };
    },
    listedAttributes() {
      return this.transformItems && this.transformItems(this.state.items);
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      return (
        value
          .toString()
          .charAt(0)
          .toUpperCase() + value.toString().slice(1)
      );
    },
  },
};
</script>

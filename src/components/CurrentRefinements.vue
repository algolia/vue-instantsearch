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
    excludedAttributes: {
      type: Array,
      required: false,
      validator(val) {
        // TODO: make this work with the connector (IS.js doesn't expose it)
        if (Array.isArray(val) && val.length > 0) {
          console.warn(
            '`excludedAttributes` is not implemented on CurrentRefinements'
          );
          return false;
        }
        return true;
      },
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
      };
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

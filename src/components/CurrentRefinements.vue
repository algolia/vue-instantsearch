<template>
    <div class="selected-filters">
        <p v-if="currentRefinedValues.length !== 0" class="selected-filters__title">Selected filters: </p>
        <div
                v-for="(item, index) in currentRefinedValues"
                :key="index"
                @click="removeCurrentFilter(item)"
                class="selected-filters__item"
        >
            <span v-if="item.attributeName === 'tree-menu'" class="selected-filters__name">Category: </span>
            <span v-else-if="item.attributeName === 'shippingCost'" class="selected-filters__name">Shipping Cost: </span>
            <span v-else-if="item.attributeName === 'unitPrice' && item.operator === '>'" class="selected-filters__name">Price(min): </span>
            <span v-else-if="item.attributeName === 'unitPrice' && item.operator === '<'" class="selected-filters__name">Price(max): </span>
            <span v-else class="selected-filters__name">{{ item.attributeName }}: </span>
            <span class="selected-filters__value">{{ item.name }}</span>
        </div>
        <div> {{ searchStore._helper.facetsRefinements }} </div>
    </div>
</template>

<script>
import algoliaComponent from '../component';
import {
  getFilteredRefinements,
  clearRefinementFromState,
} from './clearRefinements.js';

export default {
  mixins: [algoliaComponent],
  computed: {
    currentRefinedValues() {
      const results = this.searchStore._helper.lastResults;
      const state = this.searchStore._helper.state;
      const attributeNames = [];
      const onlyListedAttributes = false;
      const clearsQuery = false;
      const refinements = getFilteredRefinements(
        results,
        state,
        attributeNames,
        onlyListedAttributes,
        clearsQuery
      );
      return refinements;
    },
  },
  methods: {
    removeCurrentFilter(refinement) {
      this.searchStore._helper
        .setState(
          clearRefinementFromState(this.searchStore._helper.state, refinement)
        )
        .search();
    },
  },
};
</script>

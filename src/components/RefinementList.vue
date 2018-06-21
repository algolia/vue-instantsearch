<template>
  <div :class="suit('')" v-if="state">
    <div :class="suit('searchBox')" v-if="searchable">
      <ais-search-input :refine="state.searchForItems"></ais-search-input>
    </div>
    <ul :class="suit('list')">
      <li
        :class="[suit('item'), {[suit('item', 'selected')]: item.isRefined}]"
        v-for="item in state.items"
        :key="item.value"
      >
        <label :class="suit('label')">
          <input
            :class="suit('checkbox')"
            type="checkbox"
            :value="item.value"
            :checked="item.isRefined"
            @change="state.refine(item.value)"
          />
          <span :class="suit('labelText')">{{item.value}}</span>
          <span :class="suit('count')">746</span>
        </label>
      </li>
    </ul>
    <button
      :class="suit('showMore')"
      @click="state.toggleShowMore"
      v-if="showMore"
    >
      Show {{state.isShowingMore ? 'less' : 'more'}}
    </button>
  </div>
</template>

<script>
import algoliaComponent from '../component';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import AisSearchInput from './SearchInput';

export default {
  components: { AisSearchInput },
  mixins: [algoliaComponent],
  props: {
    attribute: {
      type: String,
      required: true,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    operator: {
      type: ['and', 'or'],
      required: false,
    },
    limit: {
      type: Number,
      required: false,
    },
    showMoreLimit: {
      type: Number,
      default: 20,
      required: false,
    },
    showMore: {
      type: Boolean,
      default: false,
      required: false,
    },
    sortBy: {
      required: false,
    },
  },
  data() {
    return {
      widgetName: 'RefinementList',
    };
  },
  beforeCreate() {
    this.connector = connectRefinementList;
  },
  computed: {
    widgetParams() {
      return {
        attributeName: this.attribute,
        operator: this.operator,
        limit: this.limit,
        showMoreLimit: this.showMore && this.showMoreLimit,
        sortBy: this.sortBy,
        escapeFacetValues: true,
      };
    },
  },
};</script>

<template>
  <div :class="suit('')" v-if="state">
    <slot
      :items="items"
      :refine="state.refine"
      :searchable="searchable"
      :search-for-items="state.searchForItems"
      :show-more="showMore"
      :toggle-show-more="state.toggleShowMore"
      :is-showing-more="state.isShowingMore"
    >
      <div :class="suit('searchBox')" v-if="searchable">
        <ais-search-input :refine="state.searchForItems"></ais-search-input>
      </div>
      <ul :class="suit('list')">
        <li
          :class="[suit('item'), {[suit('item', 'selected')]: item.isRefined}]"
          v-for="item in items"
          :key="item.value"
        >
          <slot name="item" :item="item" :refine="state.refine">
            <label :class="suit('label')">
              <input
                :class="suit('checkbox')"
                type="checkbox"
                :value="item.value"
                :checked="item.isRefined"
                @change="state.refine(item.value)"
              />
              <template v-if="searchable">
                <span :class="suit('labelText')" v-html="item.highlighted"></span>
              </template>
              <template v-else>
                <span :class="suit('labelText')">{{item.label}}</span>
              </template>
              <span :class="suit('count')">{{item.count}}</span>
            </label>
          </slot>
        </li>
      </ul>
      <button
        :class="suit('showMore')"
        @click="state.toggleShowMore"
        v-if="showMore"
      >
        Show {{state.isShowingMore ? 'less' : 'more'}}
      </button>
    </slot>
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
    transformItems: {
      type: Function,
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
    items() {
      if (this.searchable) {
        return this.state.items.map(item => {
          const highlighted = item.highlighted
            .replace(
              new RegExp('<em>', 'g'),
              `<mark class="ais-Highlight-highlighted">`
            )
            .replace(new RegExp('</em>', 'g'), `</mark>`);
          return Object.assign({}, item, { highlighted });
        });
      }
      return this.state.items;
    },
    widgetParams() {
      return {
        attributeName: this.attribute,
        operator: this.operator,
        limit: this.limit,
        showMoreLimit: this.showMore ? this.showMoreLimit : undefined,
        sortBy: this.sortBy,
        escapeFacetValues: true,
        transformItems: this.transformItems,
      };
    },
  },
};
</script>


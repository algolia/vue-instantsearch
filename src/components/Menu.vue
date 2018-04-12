<template>
  <div :class="suit()" v-if="show">
    <ul :class="suit('list')">
      <li
        v-for="item in state.items"
        :class="item.isRefined ? suit('item', 'active') : suit('item')"
        @click.prevent="state.refine(item.value)"
      >
        <a
          :href="state.createURL(item.value)"
          :class="suit('link')"
          @click.prevent="state.refine(item.value)"
        >
          <span :class="suit('label')">{{item.label}}</span>
          <span :class="suit('count')">{{item.count}}</span>
        </a>
      </li>
    </ul>

    <button
      v-if="showMoreLimit && state.canToggleShowMore"
      @click.prevent="state.canToggleShowMore()"
      :class="state.canToggleShowMore ? suit('showMore') : suit('showMore', 'disabled')"
    >
      {{state.isShowingMore ? showLessLabel : showMoreLabel}}
  </button>
  </div>
</template>

<script>
import algoliaComponent from '../component';
import { connectMenu } from 'instantsearch.js/es/connectors';

export default {
  mixins: [algoliaComponent],
  props: {
    attribute: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
    showMoreLimit: {
      type: Number,
    },
    sortBy: {
      default() {
        return ['isRefined:desc', 'count:desc', 'name:asc'];
      },
    },
    showMoreLabel: {
      type: String,
      default() {
        return 'Show more';
      }
    },
    showLessLabel: {
      type: String,
      default() {
        return 'Show less';
      }
    }
  },
  computed: {
    show() {
      return this.state.items.length > 0;
    },
    widgetParams() {
      return {
        attributeName: this.attribute,
        limit: this.limit,
        showMoreLimit: this.showMoreLimit,
        sortBy: this.sortBy,
      };
    },
  },
  data() {
    return {
      widgetName: 'ais-menu',
    };
  },
  beforeCreate() {
    this.connector = connectMenu;
  },
};</script>

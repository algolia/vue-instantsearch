<template>
  <div
    v-if="state"
    :class="suit()"
  >
    <slot
      :current-refinement="currentRefinement"
      :is-search-stalled="state.isSearchStalled"
      :refine="state.refine"
    >
      <ais-search-input
        :placeholder="placeholder"
        :autofocus="autofocus"
        :show-loading-indicator="showLoadingIndicator"
        :should-show-loading-indicator="state.isSearchStalled"
        :submit-title="submitTitle"
        :clear-title="clearTitle"
        v-model="currentRefinement"
      />
    </slot>
  </div>
</template>

<script>
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import algoliaComponent from '../mixins/component';
import SearchInput from './SearchInput.vue';

export default {
  mixins: [algoliaComponent],
  components: {
    'ais-search-input': SearchInput,
  },
  props: {
    placeholder: {
      type: String,
      default: 'Search here…',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    showLoadingIndicator: {
      type: Boolean,
      default: false,
    },
    submitTitle: {
      type: String,
      default: 'Search',
    },
    clearTitle: {
      type: String,
      default: 'Clear',
    },
    value: {
      type: String,
    }
  },
  data() {
    return {
      _value: this.value,
      widgetName: 'SearchBox',
    };
  },
  beforeCreate() {
    this.connector = connectSearchBox;
  },
  methods: {
    onFormSubmit() {
      const input = this.$el.querySelector('input[type=search]');
      input.blur();
    },
    onFormReset() {
      this.state.refine('');
    },
  },
  computed: {
    currentRefinement: {
      get() {
        console.log('get')
        return this._value || this.state.query || '';
      },
      set(value) {
        console.log("set", value)
        this._value = value;
        this.state.refine(value);
        this.$emit('input', value);
      },
    },
  },
};
</script>

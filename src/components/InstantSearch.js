import instantsearch from 'instantsearch.js/es/';
import { createInstantSearchComponent } from '../util/createInstantSearchComponent';
import { warn } from '../util/warn';

const oldApi = () =>
  warn(
    `Vue InstantSearch: You used the prop api-key or api-key.
These have been replaced by search-client.

See more info here: https://community.algolia.com/vue-instantsearch/components/InstantSearch.html#usage`
  );

export default createInstantSearchComponent({
  name: 'AisInstantSearch',
  props: {
    searchClient: {
      type: Object,
      required: true,
    },
    indexName: {
      type: String,
      required: true,
    },
    routing: {
      default: null,
      validator(value) {
        if (
          typeof value === 'boolean' ||
          !value.router ||
          !value.stateMapping
        ) {
          warn('routing should be an object, with `router` and `stateMapping`');
          return false;
        }
        return true;
      },
    },
    stalledSearchDelay: {
      type: Number,
      default: 200,
    },
    searchFunction: {
      type: Function,
      default: null,
    },

    apiKey: {
      type: String,
      default: null,
      validator(value) {
        if (value) {
          oldApi();
        }
        return false;
      },
    },
    appId: {
      type: String,
      default: null,
      validator(value) {
        if (value) {
          oldApi();
        }
        return false;
      },
    },
  },
  data() {
    return {
      instantSearchInstance: instantsearch({
        searchClient: this.searchClient,
        indexName: this.indexName,
        routing: this.routing,
        stalledSearchDelay: this.stalledSearchDelay,
        searchFunction: this.searchFunction,
      }),
    };
  },
  render(createElement) {
    return createElement(
      'div',
      {
        class: {
          [this.suit()]: true,
          [this.suit('', 'ssr')]: false,
        },
      },
      this.$slots.default
    );
  },
});

import instantsearch from 'instantsearch.js/es';
import { createInstantSearchComponent } from '../util/createInstantSearchComponent';
import { warn } from '../util/warn';
import { isVue3, h } from '../util/vue-utils';

const oldApiWarning = `Vue InstantSearch: You used the prop api-key or app-id.
These have been replaced by search-client.

See more info here: https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-search-client`;

export default createInstantSearchComponent({
  name: 'AisInstantSearch',
  props: {
    searchClient: {
      type: Object,
      required: true,
    },
    insightsClient: {
      type: Function,
      required: false,
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
          (!value.router && !value.stateMapping)
        ) {
          warn(
            'The `routing` option expects an object with `router` and/or `stateMapping`.\n\nSee https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-routing'
          );
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
    initialUiState: {
      type: Object,
      required: false,
    },
    apiKey: {
      type: String,
      default: null,
      validator(value) {
        if (value) {
          warn(oldApiWarning);
        }
        return false;
      },
    },
    appId: {
      type: String,
      default: null,
      validator(value) {
        if (value) {
          warn(oldApiWarning);
        }
        return false;
      },
    },
    middlewares: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      instantSearchInstance: instantsearch({
        searchClient: this.searchClient,
        insightsClient: this.insightsClient,
        indexName: this.indexName,
        routing: this.routing,
        stalledSearchDelay: this.stalledSearchDelay,
        searchFunction: this.searchFunction,
        initialUiState: this.initialUiState,
      }),
    };
  },
  render(createElement) {
    return (isVue3 ? h : createElement)(
      'div',
      {
        class: {
          [this.suit()]: true,
          [this.suit('', 'ssr')]: false,
        },
      },
      isVue3 ? this.$slots.default() : this.$slots.default
    );
  },
});

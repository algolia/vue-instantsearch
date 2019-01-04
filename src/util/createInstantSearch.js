import instantsearch from 'instantsearch.js/es/';
import { createSuitMixin } from '../mixins/suit';
import { warn } from './warn';
import { version } from '../../package.json'; // rollup does pick only what needed from json

const oldApi = () =>
  warn(
    `Vue InstantSearch: You used the prop api-key or api-key.
These have been replaced by search-client.

See more info here: https://community.algolia.com/vue-instantsearch/components/InstantSearch.html#usage`
  );

export const createInstantSearch = ({ ssr }) => ({
  name: `AisInstantSearch${ssr ? 'Ssr' : ''}`,
  mixins: [createSuitMixin({ name: 'InstantSearch' })],
  inject: ssr
    ? {
        $_ais: {
          // Injected by the user's root component
          name: 'ais',
        },
      }
    : undefined,
  provide() {
    return {
      instantSearchInstance: this.instantSearchInstance,
    };
  },
  props: {
    apiKey: {
      type: String,
      default: null,
      validator(value) {
        if (value) {
          oldApi();
        }
      },
    },
    appId: {
      type: String,
      default: null,
      validator(value) {
        if (value) {
          oldApi();
        }
      },
    },
    ...(ssr
      ? {}
      : {
          searchClient: {
            type: Object,
            required: true,
          },
          indexName: {
            type: String,
            required: true,
          },
        }),
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
  },
  data() {
    return {
      instantSearchInstance: ssr
        ? this.$_ais
        : instantsearch({
            searchClient: this.searchClient,
            indexName: this.indexName,
            routing: this.routing,
            stalledSearchDelay: this.stalledSearchDelay,
            searchFunction: this.searchFunction,
          }),
    };
  },
  watch: {
    searchClient(searchClient) {
      this.instantSearchInstance.helper.setClient(searchClient).search();
    },
    indexName(indexName) {
      this.instantSearchInstance.helper.setIndex(indexName).search();
    },
    stalledSearchDelay(stalledSearchDelay) {
      // private InstantSearch.js API:
      this.instantSearchInstance._stalledSearchDelay = stalledSearchDelay;
    },
    routing() {
      throw new Error(
        'routing configuration can not be changed dynamically at this point.' +
          '\n\n' +
          'Please open a new issue: https://github.com/algolia/vue-instantsearch/issues/new?template=feature.md'
      );
    },
    searchFunction(searchFunction) {
      // private InstantSearch.js API:
      this.instantSearchInstance._searchFunction = searchFunction;
    },
  },
  created() {
    const searchClient = this.instantSearchInstance.client;
    if (typeof searchClient.addAlgoliaAgent === 'function') {
      searchClient.addAlgoliaAgent(`Vue InstantSearch (${version})`);
    }
  },
  mounted() {
    // from the documentation: https://vuejs.org/v2/api/#mounted
    // "Note that mounted does not guarantee that all child components have also been mounted. If you want to
    // wait until the entire view has been rendered, you can use vm.$nextTick inside of mounted"
    this.$nextTick(() => {
      this.instantSearchInstance.start();
    });
  },
});

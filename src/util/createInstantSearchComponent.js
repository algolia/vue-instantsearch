import { createSuitMixin } from '../mixins/suit';
import { version } from '../../package.json'; // rollup does pick only what needed from json

export const createInstantSearchComponent = () => ({
  mixins: [createSuitMixin({ name: 'InstantSearch' })],
  provide() {
    return {
      instantSearchInstance: this.instantSearchInstance,
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
  beforeDestroy() {
    this.instantSearchInstance.dispose();
    this.instantSearchInstance.started = false;
  },
  render(createElement) {
    return createElement(
      'div',
      {
        class: {
          [this.suit()]: true,
          [this.suit('', 'ssr')]: ssr,
        },
      },
      this.$slots.default
    );
  },
});

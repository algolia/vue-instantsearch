<template>
  <div :class="bem()">
    <slot></slot>
  </div>
</template>

<script>
import {
  createFromAlgoliaCredentials,
  createFromAlgoliaClient,
} from '../store';
import algoliaComponent from '../component';

export default {
  mixins: [algoliaComponent],
  props: {
    searchStore: {
      type: Object,
      default() {
        return this._searchStore;
      },
    },
    searchClient: {
      type: Object,
    },
    apiKey: {
      type: String,
      default() {
        if (this._searchStore) {
          return this._searchStore.algoliaApiKey;
        }

        return undefined;
      },
    },
    appId: {
      type: String,
      default() {
        if (this._searchStore) {
          return this._searchStore.algoliaAppId;
        }

        return undefined;
      },
    },
    indexName: {
      type: String,
      default() {
        if (this._searchStore) {
          return this._searchStore.indexName;
        }

        return undefined;
      },
    },
    query: {
      type: String,
      default: '',
    },
    queryParameters: {
      type: Object,
    },
    cache: {
      type: Boolean,
      default: true,
    },
    autoSearch: {
      type: Boolean,
      default: true,
    },
    stalledSearchDelay: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      blockClassName: 'ais-index',
    };
  },
  provide() {
    if (this.searchClient) {
      if (!this.indexName) {
        throw new Error(
          'vue-instantsearch: `indexName` is required with `searchClient`'
        );
      }

      if (this.searchStore) {
        throw new Error('`searchStore` cannot be used with `searchClient`');
      }

      if (this.appId) {
        throw new Error(
          'vue-instantsearch: `appId` cannot be used with `searchClient`'
        );
      }

      if (this.apiKey) {
        throw new Error(
          'vue-instantsearch: `apiKey` cannot be used with `searchClient`'
        );
      }

      if (typeof this.searchClient.search !== 'function') {
        throw new Error(
          'vue-instantsearch: `searchClient` must implement a method `search(requests)`'
        );
      }

      this._localSearchStore = createFromAlgoliaClient(Object.create(this.searchClient));
    } else {
      if (!this.searchStore) {
        this._localSearchStore = createFromAlgoliaCredentials(
          this.appId,
          this.apiKey,
          { stalledSearchDelay: this.stalledSearchDelay }
        );
      } else {
        this._localSearchStore = this.searchStore;
      }
    }

    if (this.indexName) {
      this._localSearchStore.indexName = this.indexName;
    }

    if (this.query) {
      this._localSearchStore.query = this.query;
    }

    if (this.queryParameters) {
      this._localSearchStore.queryParameters = this.queryParameters;
    }

    if (this.cache) {
      this._localSearchStore.enableCache();
    } else {
      this._localSearchStore.disableCache();
    }

    return {
      _searchStore: this._localSearchStore,
    };
  },
  mounted() {
    this._localSearchStore.start();
    if (this.autoSearch) {
      this._localSearchStore.refresh();
    }
  },
  watch: {
    indexName() {
      this._localSearchStore.indexName = this.indexName;
    },
    query() {
      this._localSearchStore.query = this.query;
    },
    queryParameters() {
      this._localSearchStore.queryParameters = this.queryParameters;
    },
  },
};
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import instantsearch from 'instantsearch.js/es/';

export default {
  provide() {
    this._instantSearchInstance = instantsearch({
      appId: this.appId,
      apiKey: this.apiKey,
      indexName: this.indexName,
    });
    
    return {
      _instantSearchInstance: this._instantSearchInstance
    };
  },
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    appId: {
      type: String,
      required: true,
    },
    indexName: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      widgetName: 'Index',
    };
  },
  mounted() {
    // from the documentation: https://vuejs.org/v2/api/#mounted
    // "Note that mounted does not guarantee that all child components have also been mounted. If you want to
    // wait until the entire view has been rendered, you can use vm.$nextTick inside of mounted"
    this.$nextTick(() => {
      this._instantSearchInstance.start();
    });
  },
};</script>

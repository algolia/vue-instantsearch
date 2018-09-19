<template>
  <ais-index
    :search-client="searchClient"
    index-name="movies"
  >
    <ais-search-box />
    <ais-hits />
  </ais-index>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import './App.css';

export default {
  data() {
    return {
      searchClient: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ),
    };
  },
};
</script>

<template>
  <ais-index
    :search-client="searchClient"
    index-name="movies"
  >
    <header class="navbar">
      <img src="https://res.cloudinary.com/hilnmyskv/image/upload/w_100,h_100,dpr_2.0//v1461180087/logo-instantsearchjs-avatar.png" width="40">
      <h1 class="navbar__title">
        You <i class="fa fa-youtube-play"></i>
      </h1>
      <ais-search-box placeholder="" />
    </header>
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

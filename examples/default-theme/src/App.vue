<template>
  <div id="root">
    <ais-index
      :search-client="searchClient"
      index-name="instant_search"
      :routing="true"
    >
      <ais-configure :hitsPerPage="16" />

      <header>
        <img class="logo" src="https://res.cloudinary.com/hilnmyskv/image/upload/w_100,h_100,dpr_2.0//v1461180087/logo-instantsearchjs-avatar.png" width="40">
        <ais-search-box placeholder="Search a product" />
      </header>

      <main>
        <aside>Filters</aside>
        <section>Results</section>
      </main>
    </ais-index>
  </div>
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

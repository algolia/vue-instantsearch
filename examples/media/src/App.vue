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

    <main>
      <aside>
        <ais-panel>
          <h5 slot="header"><i class="fa fa-chevron-right"></i> Genres</h5>
          <ais-refinement-list attribute="genre" />
        </ais-panel>
        <ais-panel>
          <h5 slot="header"><i class="fa fa-chevron-right"></i> Ratings</h5>
          <ais-rating-menu attribute="rating" />
        </ais-panel>
        <div class="thank-you">
          Data courtesy of <a href="https://www.imdb.com/">imdb.com</a>
        </div>
      </aside>

      <section class="content">
        <div class="results">
          <div class="results-header">
            <ais-stats />
          </div>
          <ais-hits />
        </div>
      </section>
    </main>
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

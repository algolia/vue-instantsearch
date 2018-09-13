<template>
  <div id="root">
    <ais-index
      :search-client="searchClient"
      index-name="instant_search"
    >
      <ais-configure :hitsPerPage="16" />
      <header class="navbar">
        <img src="https://res.cloudinary.com/hilnmyskv/image/upload/w_100,h_100,dpr_2.0//v1461180087/logo-instantsearchjs-avatar.png" width="40">
        <h1 class="navbar-title">aeki</h1>
        <ais-search-box placeholder="Search a product" />
      </header>
      <ais-hits>
        <main
          slot="default"
          slot-scope="{ items }"
          class="products"
        >
          <ais-panel>
            <template slot="header">
              <h5>Rating</h5>
            </template>
            <template slot="default">
              <ais-rating-menu
                attribute="rating"
                :max="5"
              />
            </template>
          </ais-panel>
          <ais-state-results>
            <template slot-scope="{ query, hits }">
              <div class="results-wrapper" v-if="hits.length === 0">
                <div class="no-results">
                  No results found matching <span class="query">{{query}}</span>
                </div>
              </div>
            </template>
          </ais-state-results>
          <div>
            <article
              v-for="item in items"
              :key="item.objectID"
              class="product"
            >
              <div class="product-picture-wrapper">
                <img class="product-picture" :src="item.image" :alt="item.name" />
              </div>
              <div class="product-desc-wrapper">
                <div class="product-name">
                  <ais-highlight attribute="name" :hit="item" />
                </div>
                <div class="product-type">
                  <ais-highlight attribute="type" :hit="item" />
                </div>
                <div class="product-footer">
                  <div class="ais-RatingMenu-link">
                    <svg
                      v-for="(_,i) in 5"
                      :key="i"
                      :class="[
                        'ais-RatingMenu-starIcon',
                        i >= item.rating && 'ais-RatingMenu-starIcon--empty'
                      ]"
                      aria-hidden="true"
                      width="24"
                      height="24"
                    >
                      <use
                        :xlink:href="`#ais-RatingMenu-star${i >= item.rating ? 'Empty' : ''}Symbol`" 
                      />
                    </svg>
                  </div>
                  <div class="product-price">${{ item.price }}</div>
                </div>
              </div>
            </article>
          </div>
        </main>
      </ais-hits>
    </ais-index>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';

export default {
  data() {
    return {
      searchClient: algoliasearch('latency','6be0576ff61c053d5f9a3225e2a90f76'),
    };
  },
};
</script>


<style>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: Verdana, sans-serif;
}

.navbar {
  background-color: #222f3f;
  display: flex;
  align-items: center;
  padding: 10px;
}

.navbar-title {
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  margin: 0 15px;
}

/*
 * SearchBox
 */

.ais-SearchBox-form {
  display: flex;
}

.ais-SearchBox-input {
  width: 275px;
  padding: 5px 12px;
  border: 1px solid transparent;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-family: Verdana, sans-serif;
  font-size: 14px;
}

.ais-SearchBox-input:focus {
  border-color: #ffbe61;
  outline: none;
}

.ais-SearchBox-submit {
  background-color: #ffbe61;
  padding: 0 30px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: none;
}

.ais-SearchBox-submitIcon {
  width: 15px;
  height: 15px;
}

.ais-SearchBox-reset {
  display: none;
}

/*
 * Hits
 */

.products {
  margin: 10px -0.5% 0;
  padding: 0 10px;
}

.product {
  width: 24%;
  float: left;
  padding: 10px 20px 20px;
  margin-bottom: 10px;
  border-bottom: solid 1px #eee;
  margin: 0.5%;
  border: solid 1px #eee;
  box-shadow: 0 0 3px #f6f6f6;
  position: relative;
}

.product-picture-wrapper {
  text-align: center;
}

.product-picture {
  height: 150px;
  max-width: 100%;
}

.product-desc-wrapper {
  height: 100px;
  width: 100%;
  overflow: hidden;
}

.product-name {
  font-weight: bold;
  color: #000000;
  font-size: 0.9em;
  margin: 0 0 8px;
  min-width: 120px;
}

.product-type {
  font-size: 0.8em;
  margin: 0 0 10px;
  color: #a2a2a2;
}

.product-price {
  font-weight: bold;
  color: #000000;
  float: right;
}
</style>

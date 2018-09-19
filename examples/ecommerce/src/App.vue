<template>
  <div id="root">
    <ais-index
      :search-client="searchClient"
      index-name="instant_search"
    >
      <ais-configure :hitsPerPage="16" />
      <my-header />

      <div class="content-wrapper">
        <aside>
          <ais-clear-refinements
          />
            <!-- translations={{
              reset: 'Clear all filters',
            }} -->

          <section class="facet-wrapper">
            <div class="facet-category-title facet">Show results for</div>
            <ais-hierarchical-menu
              :attributes="[
                'hierarchicalCategories.lvl0',
                'hierarchicalCategories.lvl1',
                'hierarchicalCategories.lvl2',
              ]"
            />
          </section>

          <section class="facet-wrapper">
            <div class="facet-category-title facet">Refine By</div>

            <ais-panel>
              <template slot="header">
                <h5>Type</h5>
              </template>
              <template slot="default">
                <ais-refinement-list
                  attribute="type"
                  operator="or"
                  :max="5"
                />
              </template>
            </ais-panel>

            <ais-panel>
              <template slot="header">
                <h5>Brand</h5>
              </template>
              <template slot="default">
                <ais-refinement-list
                  searchable
                  attribute="brand"
                  operator="or"
                  :max="5"
                />
              </template>
            </ais-panel>

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

            <ais-panel>
              <template slot="header">
                <h5>Price</h5>
              </template>
              <template slot="default">
                <ais-range-input attribute="price" />
              </template>
            </ais-panel>

          </section>

          <div class="thank-you">
            Data courtesy of <a href="https://developer.bestbuy.com/">Best Buy</a>
          </div>
        </aside>

        <ais-hits>
          <main
            slot="default"
            slot-scope="{ items }"
            class="products"
          >
            <ais-search-state>
              <template slot-scope="{ query, hits }">
                <div class="results-wrapper" v-if="hits.length === 0">
                  <div class="no-results">
                    No results found matching <span class="query">{{query}}</span>
                  </div>
                </div>
              </template>
            </ais-search-state>
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
                <div class="product-brand">
                  <ais-highlight attribute="brand" :hit="item" />
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
          </main>
        </ais-hits>
      </div>
    </ais-index>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import MyHeader from './components/Header.vue';

export default {
  components: {
    MyHeader,
  },
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

.content-wrapper {
  display: flex;
}

.content-wrapper aside {
  /* @TODO: size correctly */
  width: 15em;
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
  margin-bottom: 10px;
}

.product-picture {
  height: 150px;
  max-width: 100%;
}

.product-desc-wrapper {
  height: 125px;
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

.product-brand {
  font-size: 0.8em;
  margin: 0 0 10px;
  color: #a2a2a2;
}

.product-footer {
  display: flex;
  justify-content: space-between;
}

.product-price {
  font-weight: bold;
  color: #000000;
}

.ais-RatingMenu-starIcon {
  width: 15px;
  fill: #ffc168;
}

.ais-RatingMenu-starIcon {
  width: 15px;
  fill: #ffc168;
}
</style>

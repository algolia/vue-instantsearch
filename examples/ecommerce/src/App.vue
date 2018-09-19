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
          <ais-clear-refinements>
            <template slot="resetLabel">
              Clear all filters
            </template>
          </ais-clear-refinements>

          <section class="facet-wrapper">
            <div class="facet-title">Show results for</div>
            <ais-hierarchical-menu
              :attributes="[
                'hierarchicalCategories.lvl0',
                'hierarchicalCategories.lvl1',
                'hierarchicalCategories.lvl2',
              ]"
            />
          </section>

          <section class="facet-wrapper">
            <div class="facet-title">Refine By</div>

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
  font-size: 12px;
  font-family: Verdana, sans-serif;
  height: 100%;
}

#root,
.ais-Index {
  height: 100%;
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
  height: calc(100% - 60px);
}

/*
 * Aside
 */

aside {
  border-right: 1px solid #eee;
  padding: 20px;
  flex: 0 0 20em;
}

.ais-ClearRefinements-button {
  display: block;
  margin-bottom: 16px;
  font-size: 13px;
  background-color: white;
  border: 1px solid lightgray;
  color: #000000;
}

.facet-wrapper {
  padding-bottom: 12px;
  border-bottom: solid 1px #eee;
  margin-bottom: 12px;
  font-size: 0.87em;
  display: flex;
  flex-direction: column;
}

.facet-title {
  font-size: 1.2em;
  color: #888;
  margin-bottom: 16px;
}

.ais-Panel-header {
  margin: 4px 0;
  clear: both;
  padding: initial;
  border-bottom: none;
}

.ais-Panel-header h5 {
  font-weight: bold;
  text-transform: none;
  font-size: 1.5em;
  margin: 10px 0;
}

aside a,
.ais-HierarchicalMenu-link {
  color: #000000;
}

.ais-HierarchicalMenu-item {
  margin-top: 0px;
  font-size: 1.6em;
}

.ais-HierarchicalMenu-item:after {
  content: none;
}

.ais-HierarchicalMenu-link:hover,
.ais-RatingMenu-link:hover {
  color: #b32500;
  text-decoration: none;
}

.ais-HierarchicalMenu-item--selected > a,
.ais-HierarchicalMenu-item--selected.ais-HierarchicalMenu-item--parent > a {
  font-weight: bold;
}

.ais-HierarchicalMenu-link {
  margin-right: 4px;
}

.ais-HierarchicalMenu-label:before {
  content: '> ';
}

.ais-HierarchicalMenu-list--child {
  margin-left: 10px;
}

.ais-RefinementList-label {
  font-weight: 100;
  color: #000000;
}

.ais-RefinementList-checkbox {
  margin-right: 5px;
}

.ais-RefinementList-count,
.ais-HierarchicalMenu-count {
  color: #6f6e6c;
  background-color: initial;
}

.ais-RefinementList-searchBox .ais-SearchBox-input {
  padding: 0.3em 2em;
}

.ais-RangeInput-input--min,
.ais-RangeInput-input--max {
  width: 50px;
  border-radius: 2px;
  border: solid 1px #888;
  font-weight: normal;
  font-size: 12px;
  padding: 0px;
  margin: 0px;
}

.ais-RangeInput-separator {
  margin: 0px 5px;
}

.ais-RangeInput-submit {
  display: block;
  float: right;
  width: 22px;
  height: 22px;
  padding: 0;
  margin-left: 6px;
  font-size: 10px;
  line-height: 20px;
  border: solid 1px #888;
  border-radius: 50%;
  text-align: center;
  background: none;
  color: #000000;
}

.ais-RangeInput-submit:hover {
  color: #0063c3;
  background-color: #ffffff;
}

.ais-RatingMenu-label,
.ais-RatingMenu-item--selected .ais-RatingMenu-label {
  color: #000000;
}

.ais-RatingMenu-item--selected .ais-RatingMenu-label {
  font-weight: 700;
}

.ais-RatingMenu-count {
  color: #6f6e6c;
  background-color: initial;
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

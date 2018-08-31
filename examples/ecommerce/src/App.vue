<template>
  <div id="root">
    <ais-index
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="ikea"
    >
      <ais-configure :hitsPerPage="16" />
      <header class="navbar">
        <img src="https://res.cloudinary.com/hilnmyskv/image/upload/w_100,h_100,dpr_2.0//v1461180087/logo-instantsearchjs-avatar.png" width="40">
        <h1 class="navbar-title">aeki</h1>
        <ais-search-box placeholder="Search a product" />
      </header>
      <ais-hits>
        <main slot="default" slot-scope="{ items }">
          <article
            v-for="item in items"
            :key="item.objectID"
          >
            <ais-highlight attribute="name" :hit="item" />
          </article>
        </main>
      </ais-hits>
    </ais-index>
  </div>
</template>

<script>
import {
  Index,
  Configure,
  SearchBox,
  Hits,
  Highlight,
} from 'vue-instantsearch';

export default {
  name: 'App',
  components: {
    AisIndex: Index,
    AisConfigure: Configure,
    AisSearchBox: SearchBox,
    AisHits: Hits,
    AisHighlight: Highlight,
  },
};
</script>

<style>
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
</style>

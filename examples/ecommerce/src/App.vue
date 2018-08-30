<template>
  <div id="root">
    <ais-index
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="ikea"
    >
      <ais-configure :hitsPerPage="16" />
      <ais-search-box />
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
import { Index, Configure, SearchBox, Hits, Highlight } from 'vue-instantsearch';

export default {
  name: 'App',
  components: {
    AisIndex: Index,
    AisConfigure: Configure,
    AisSearchBox: SearchBox,
    AisHits: Hits,
    AisHighlight: Highlight,
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>

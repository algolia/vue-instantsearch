Components
---

Vue InstantSearch comes pre-packaged with many components necessary to build a full-featured search experience.

If provided components do not fit your needs, let us know via [GitHub](https://github.com/algolia/vue-instantsearch/issues) and then have a look at how to [create custom components](custom-components.md).

## Available components

* [Index](components/index.md)
* [Search Box](components/search-box.md)
* [Results](components/results.md)
* [No Results](components/no-results.md)
* [Refinement List](components/refinement-list.md)
* [Pagination](components/pagination.md)
* [Clear](components/clear.md)
* [Stats](components/stats.md)
* [Powered By](components/powered-by.md)
* [Price Range](components/price-range.md)
* [Results per Page Selector](components/results-per-page-selector.md)
* [Sort by Selector](components/sort-by-selector.md)
* [Rating](components/rating.md)

## Registering components

There are 2 ways of registering components, all at once or one by one.

### All components at once

Vue InstantSearch is shipped as a Vue plugin.

```js
// src/main.js
import Vue from 'vue';
import App from './App.vue'
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

The line `Vue.use(InstantSearch);` registers all components at once and make them available
in templates.

**Info: When using the [standalone build](./installing.md#TODO), all components are automatically imported.**

### Only the used components

The previous approach is nice and easy, but it has the drawback of including code from components in the final application that we might not use.

An alternative approach is to register components when we need them:

```js
// src/main.js
import Vue from 'vue';
import App from './App.vue'
import { Index, SearchBox, Results, Pagination } from 'vue-instantsearch';

Vue.component('ais-index', Index);
Vue.component('ais-searchBox', SearchBox);
Vue.component('ais-results', Results);
Vue.component('ais-pagination', Pagination);

new Vue({
  el: '#app',
  render: h => h(App)
})
```

With this approach, only the four manually imported components will be part of your production build. The other components will be removed after [tree-shaking](https://webpack.js.org/guides/tree-shaking/).

### Naming

When using `Vue.use(InstantSearch);`, all components are registered with the `ais-` prefix, which stands for Algolia's InstantSearch. Example: `ais-search-box`.

When manually importing components, you can change that naming and assign a custom tag name.

## Using components

All search components must be wrapped in an [`Index`](components/index.md) component.

```html
<template>
  <div id="app">
    <ais-index app-id="appId" api-key="apiKey" index-name="indexName">
      <ais-search-box></ais-search-box>
      <ais-results></ais-results>
      <ais-pagination></ais-pagination>
    </ais-index>
  </div>
</template>
```

To read why a search component needs to be wrapped into an Index component, have a look at the [custom components](custom-components.md) page.

### Avoiding the use of an `Index` component

You might not want to use a wrapping `Index` component or maybe you want to do some [server-side rendering](server-side-rendering.md).

In those cases, you can manually tie components to a search store by passing a `searchStore` property to them:

```html
<template>
  <div id="app">
    <ais-search-box :search-store="searchStore"></ais-search-box>
    <ais-index :search-store="searchStore" index-name="indexName">
      <ais-results></ais-results>
      <ais-pagination></ais-pagination>
    </ais-index>
  </div>
</template>
<script>
  import { createFromAlgoliaCredentials } from 'vue-instantsearch';

  export default {
    name: 'app',
    data: function() {
      return {
        searchStore: createFromAlgoliaCredentials('appId', 'apiKey'),
      };
    },
  }
</script>
```

**Info: The Index component also accepts the searchStore as parameter. Here we used that to avoid us to repeat the Algolia credentials.**

**Best practice: Wrapping your search components with an `Index` component makes it easier to reason about the code. All the logic is then declared inside of the template instead of being spread between templates and methods or objects. If you do not need to manually inject a search store, we recommend you stick with using the Index component.**

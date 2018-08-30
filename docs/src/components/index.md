---
title: Index
mainTitle: Components
layout: main.pug
category: Components
withHeadings: true
navWeight: 1
editable: true
githubSource: docs/src/components/index.md
---

A wrapper component that allows you to configure the credentials and query parameters for the search.

This component automatically provides the search state to all its children.

## Usage

Basic usage:

```html
<template>
  <ais-index index-name="your_indexName"
            :searchClient="searchClient"
  >
    <!-- Add your InstantSearch components here. -->
  </ais-index>
</template>

<!-- You need to instantiate the search client in your script -->
<script>
import algoliasearch from 'algoliasearch/lite';

export default {
  data() {
    return {
      searchClient: algoliasearch(
        'latency',
        '3d9875e51fbd20c7754e65422f7ce5e1'
      ),
    };
  },
};
</script>
```

## Props

  | Name             | Type    | Default | Description                                                                                                                                        |
|------------------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| searchClient      | Object  | ``      | The instance of a search client like algoliaSearch   |
| index-name       | String  | ``      | The index name                                                                                                                                     |
| query            | String  | ``      | The search query                                                                                                                                   |
| query-parameters | Object  | ``      | The search query parameters. Available options are [documented here](https://www.algolia.com/doc/api-reference/search-api-parameters/). |
| stalledSearchDelay | number | `200`  | Time before the search is considered unresponsive. Used to display a loading indicator. |

## Slots

| Name    | Description                                                                      |
|---------|----------------------------------------------------------------------------------|
| default | Can contain anything. All InstantSearch components will have the index injected. |

## CSS Classes

| ClassName   | Description     |
|-------------|-----------------|
| `ais-index` | Container class |

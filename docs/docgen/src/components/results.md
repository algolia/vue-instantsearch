---
title: Results
mainTitle: Components
layout: main.pug
category: Components
withHeadings: true
navWeight: 4
editable: true
githubSource: docs/docgen/src/components/results.md
---

A component to format and render the search results.

## Usage

Basic usage:

```html
<ais-results>
  <template scope="{ result }">
    <h2>
      <a :href="result.url">
        {{ result.title }}
      </a>
    </h2>
    <p>{{ result.description }}</p>
  </template>
</ais-results>
```

Display results in a table:

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <ais-results tag-name="tbody">
    <template scope="{ result }">
      <tr>
        <td>{{ result.name }}</td>
        <td>{{ result.description }}</td>
      </tr>
    </template>
  </ais-results>
</table>
```

## Props

| Name             | Type    | Default | Description                                                                    |
|------------------|---------|---------|--------------------------------------------------------------------------------|
| stack            | Boolean | `false` | If true, will append results of next page to current results when page changes |
| results-per-page | Number  | ``      | The number of results to display                                               |
| tag-name         | String  | `div`   | The wrapper tag name                                                           |


## Slots

| Name    | Props  | Default                                                                                         | Description     |
|---------|--------|-------------------------------------------------------------------------------------------------|-----------------|
| default | result | Displays the objectID                                                                           | First page text |
| header  |        | Allows to add content at the top of the component which will be hidden when the component is    |                 |
| footer  |        | Allows to add content at the bottom of the component which will be hidden when the component is |                 |

## CSS Classes

| ClassName   | Description     |
|-------------|-----------------|
| ais-results | Container class |

---
title: Stats
mainTitle: Components
layout: main.pug
category: Components
withHeadings: true
navWeight: 11
editable: true
githubSource: docs/src/components/stats.md
---

A component that exposes result stats for display.

<a class="btn btn-static-theme" href="stories/?selectedKind=Stats">🕹 try out live</a>

## Usage

Basic usage:

```html
<ais-stats></ais-stats>
```

Custom text:

```html
<ais-stats>
  <template slot-scope="{ totalResults, processingTime, query, resultStart, resultEnd }">
    Showing {{ resultStart }} - {{ resultEnd }} of {{ totalResults }} results. Your query: <b>{{ query }}</b> took {{ processingTime }}ms
  </template>
</ais-stats>
```

## Slots

| Name    | Props                               | Default                                                        | Description        |
|:--------|:------------------------------------|:---------------------------------------------------------------|:-------------------|
| default | totalResults, processingTime, query, resultStart, resultEnd | `'{{ totalResults }} results found in {{ processingTime }}ms'` | The text displayed |


## CSS Classes

| ClassName   | Description     |
|:------------|:----------------|
| `ais-stats` | Container class |

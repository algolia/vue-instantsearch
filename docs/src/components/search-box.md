---
title: Searchbox
mainTitle: Components
layout: main.pug
category: Components
withHeadings: true
navWeight: 3
editable: true
githubSource: docs/src/components/search-box.md
---

A search input with a clear and submit button.

<a class="btn btn-static-theme" href="stories/?selectedKind=SearchBox">🕹 try out live</a>

## Usage

Basic usage:

```html
<ais-search-box placeholder="Find products..."></ais-search-box>
```

With autofocus:

```html
<ais-search-box :autofocus="true"></ais-search-box>
```

## Props

| Name                   | Type    | Default    | Description                                                                    |
| :--------------------- | :------ | :--------- | :----------------------------------------------------------------------------- |
| placeholder            | String  | `''`       | The input placeholder                                                          |
| submit-title           | String  | `'Search'` | The submit button title                                                        |
| clear-title            | String  | `'Clear'`  | The clear button title                                                         |
| autofocus              | Boolean | `false`    | Whether to automatically focus on the input when rendered                      |
| show-loading-indicator | Boolean | `false`    | Whether to indicate at beginning of the input that search is currently stalled |

## Slots

| Name    | Props | Default                                                     | Description     |
| :------ | :---- | :---------------------------------------------------------- | :-------------- |
| default |       | Contains the search input, and the clear and submit buttons | First page text |

## CSS Classes

| ClassName                | Description       |
| :----------------------- | :---------------- |
| `ais-search-box`         | Container class   |
| `ais-search-box__submit` | The submit button |

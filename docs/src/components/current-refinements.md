---
title: CurrentRefinements
mainTitle: Components
layout: main.pug
category: Components
withHeadings: true
navWeight: 6
editable: true
githubSource: docs/src/components/current-refinements.md
---

Show the currently refined values and allow them to be unset.

<a class="btn btn-static-theme" href="stories/?selectedKind=CurrentRefinements">🕹 try out live</a>

## Usage

```html
<ais-current-refinements :clears-query="true"></ais-current-refinements>
```

## Props

Name | Type | Default | Description | Required
---|---|---|---|---
attributes | Array | | Allows you to format the attributes | no
clearsQuery | Boolean | `false` | Should the 'clear all' button also clear the query? | no
excludedAttributes | Array | `[]` | Attributes not to show or clear | no

## CSS classes

Here's a list of CSS classes exposed by this widget. To better understand the underlying
DOM structure, have a look at the generated DOM in your browser.

Class name | Description
---|---
`ais-CurrentRefinements` | Container class
`ais-CurrentRefinements-item` | An item
`ais-CurrentRefinements-item--selected` | Selected item

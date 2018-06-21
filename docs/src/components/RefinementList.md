---
title: RefinementList
mainTitle: Components
layout: main.pug
category: Components
withHeadings: true
navWeight: 6
editable: true
githubSource: docs/src/components/RefinementList.md
---

A refinement list takes all possible values for a certain attribute and puts them in a list. A user is then able to pick one or multiple refinements for this attribute. It's also possible to search within the possible values of this attribute. Make sure that your attribute of choice is set up in `attributesForFaceting`, `searchable` if you want so.

<a class="btn btn-static-theme" href="stories/?selectedKind=RefinementList">🕹 try out live</a>

## Usage

```html
<ais-refinement-list :attribute="brands"></ais-refinement-list>
```

## Props

Name | Type | Default | Description | Required
---|---|---|---|---
attribute | string | | The attribute to refine on click | yes
searchable | boolean | `false` | You can also search within the options of this | no
operator | "or"/"and" | "or" | How to apply refinements | no
limit | number | 10 | Number of items to show | no
showMoreLimit | number | 20 | Number of items to show when the user clicked on “show more items” | no
showMore | boolean | false | Whether or not to have the option to load more values | no
sortBy | array\|sort function | `['isRefined:desc', 'count:desc', 'name:asc']` | array or function to sort the results by | no

## CSS classes

Here's a list of CSS classes exposed by this widget. To better understand the underlying
DOM structure, have a look at the generated DOM in your browser.

Class name | Description
---|---
`ais-RefinementList` | Container class
`ais-RefinementList-item` | An item
`ais-RefinementList-item--selected` | Selected item

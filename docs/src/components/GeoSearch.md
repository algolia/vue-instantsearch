---
title: Template
mainTitle: Components
layout: main.pug
category: Components
withHeadings: true
navWeight: 6
editable: true
githubSource: docs/src/components/template.md
---

TODO! Fill in this page or else...

Oh you're gonna love templates.

<a class="btn btn-static-theme" href="stories/?selectedKind=Template">🕹 try out live</a>

## Usage

```html
<ais-template :option="value"></ais-template>
```

## Props

Name | Type | Default | Description | Required
---|---|---|---|---
`enable-refine-on-map-move` | `Boolean` | `true` | If true, refine will be triggered as you move the map. | no
`enable-geolocation-with-ip` | `Boolean` | `true` | If true, the IP will be use for the geolocation. When the position option is provided this option will be ignored. | no
`position` | `{lat: Number, lng: Number}` | | Position that will be use to search around. | no
`radius` | `Number` | | Maximum radius to search around the position (in meters). | no
`precision` | `Number` | | Precision of geo search (in meters). | no
`transform-tems` | `(Array<object>) => Array<object>` | | Function to transform the items passed to the rendering. | no

## Slots

TODO: what's `position`, the other ones?

Name | Scope | Description
---|---|---
default | `{ position: ???, items: Array, refine: Function, clearMapRefinement: Function, isRefinedWithMap: Boolean, toggleRefineOnMapMove: Function, isRefineOnMapMove: Boolean, setMapMoveSinceLastRefine: Boolean, hasMapMovedSinceLastRefine: Boolean, }` | Slot to override the DOM output

## CSS classes

Here's a list of CSS classes exposed by this widget. To better understand the underlying
DOM structure, have a look at the generated DOM in your browser.

Class name | Description
---|---
`ais-Template` | Container class
`ais-Template-item` | An item
`ais-Template-item--selected` | Selected item

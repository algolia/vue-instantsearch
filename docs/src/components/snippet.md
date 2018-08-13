---
title: Snippet
mainTitle: Components
layout: main.pug
category: Components
withHeadings: true
navWeight: 10
editable: true
githubSource: docs/src/components/snippet.md
---

Display snippeted attributes of your search results.

This component leverages the [snippeting feature of Algolia](https://www.algolia.com/doc/faq/searching/what-is-attributes-to-snippet-how-does-it-work/#faq-section)
but adds some sugar on top of it to prevent XSS attacks.


## Usage

**Basic usage:**

```html
<ais-snippet :hit="hit" attribute="description"></ais-snippet>
```

**Access a nested property:**

Given an record like:

```json
{
    "objectID": 1,
    "meta": {
        "title": "my title"
    }
}
```

You can access the snippeted version by specifying the path by separating levels with dots:

```html
<ais-snippet :hit="hit" attribute="meta.title"></ais-snippet>
```

To have correct styling with InstantSearch's style, add the following settings:

```html
<ais-configure
  highlightPreTag="<mark class='ais-Snippet-highlighted'>"
  highlightPostTag="</mark>"
>
</ais-configure>
```

## Props

Name | Type | Default | Description | Required
---|---|---|---|---
hit | Object |  | A single Algolia result as it is returned by the API. | yes
attribute | String |  | The attribute name to be snippeted. | yes

## CSS Classes

Class name | Description
---|---
`ais-Snippet` | Container class

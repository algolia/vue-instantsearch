# Info

How to convert a component to the new Vue InstantSearch architecture?

1.  follow the conventions for the specific widget in https://instantsearch-css.netlify.com/ (naming, options...)
1.  copy `src/components/__Template.vue` to new component name
1.  **implement it**: follow instructions about modifications inside this file
1.  if it's a new component, also add it in `src/instantsearch.js` and `src/__tests__/instantsearch.js`
1.  **create an example**: copy `stories/__Template.stories.js` into your own story
1.  test your own story with `yarn storybook` and develop your component
1.  copy `src/components/__tests__/__Template.js` to your own test
1.  **test it**: update the test
1.  run `yarn jest --watch` to run the tests
1.  **document it**: copy `docs/src/components/__template.md`, use `npm run docs:watch`
1.  remove any existing widget no more listed
1.  # do a pull request to feat/connectors branch

# Components

A checklist for all of the components which are completely done.

x => done
~ => in progress

* [ ] `ais-breadcrumb`
* [ ] `ais-clear-refinements`
* [ ] `ais-configure`
* [ ] `ais-current-refinements`
* [ ] `ais-hierarchical-menu`
* [ ] `ais-highlight`
* [~] `ais-hits-per-page`
* [ ] `ais-hits`
* [ ] `ais-index`
* [ ] `ais-infinite-hits`
* [ ] `ais-menu-select`
* [ ] `ais-menu`
* [ ] `ais-numeric-menu`
* [ ] `ais-numeric-selector`
* [-] `ais-pagination`
* [ ] `ais-panel`
* [ ] `ais-powered-by`
* [ ] `ais-range-input`
* [ ] `ais-range-slider`
* [ ] `ais-rating-menu`
* [ ] `ais-refinement-list`
* [ ] `ais-search-box`
* [ ] `ais-snippet`
* [ ] `ais-sort-by`
* [ ] `ais-stats`
* [ ] `ais-toggle-refinement`
* [ ] `ais-index`

# Questions/next steps

* [ ] Decide what is provided as state in every widget. Today we get everything without controlling it.
      We need to be careful, everything inside state once released will be public API
* [ ] align all filenames to the same convention: Widget.vue, **tests**/Widget.js, stories/Widget.stories.js
* [ ] do we provide granular scopes for widgets or only a single big scope?
      This needs to be aligned across all libraries, for V2.0.0 we go for no scopes at all which
      is our mantra since we created connectors: no more specific DOM options.
      We also need to ask vue-instantsearch users about their current scope usage.
      We can also do GitHub searches to see if people are using some named scopes + vue-instantsearch (to sense the usage)
* [ ] remove any scope that is not a root scope for now
* [x] can we do a manual mock for component in tests instead of having the mock copy pasted everywhere?

---

# Rounding up work

* [ ] release plan
* [ ] migration guide

# Prep work

* [x] pass down an InstantSearch.js instance
* [ ] apply correct properties to the main component
* [x] allow passing of a connector on a widget
* [x] allow destroying of a widget
* [x] allow changing of parameters on a widget
* [x] allow widgetFactories without connector (i.e. `configure`)
* [x] define which options to use
* [x] define which DOM to use
* [ ] update `bem` function to `suit` (CSS)
* [ ] change the way props are passed down with `$props` and filtering out mixin ones

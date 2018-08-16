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

* [~] `ais-breadcrumb` Samuel
* [x] `ais-clear-refinements`
* [x] `ais-configure`
* [~] `ais-current-refinements` Haroenv
* [ ] `ais-hierarchical-menu`
* [~] `ais-highlight` Haroenv
  * Just a getter for \_highlightResult, doesn't set any parameters
* [x] `ais-hits-per-page`
* [x] `ais-hits`
* [x] `ais-index`
* [x] `ais-infinite-hits`
* [x] `ais-menu-select`
* [x] `ais-menu`
* [x] `ais-numeric-menu`
* [x] `ais-pagination`
* [~] `ais-panel`
  * Just header & footer slot, doesn't get any child info
* [x] `ais-powered-by`
* [x] `ais-range-input`
* [~] `ais-range-slider` Alex
* [x] `ais-rating-menu`
* [~] `ais-refinement-list` Haroenv
* [x] `ais-search-box`
* [~] `ais-snippet` Haroenv
  * Just a getter for \_snippetResult, doesn't set any parameters
* [x] `ais-sort-by`
* [x] `ais-stats`
* [x] `ais-toggle-refinement`

## Which level of customization?

1.  there's a slot at the top level (always)
2.  every list as `item` as a slot (if makes sense, can be added after 2.0)

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

* [~] `ais-breadcrumb` vvo
* [ ] `ais-clear-refinements`
* [ ] `ais-configure`
* [~] `ais-current-refinements` Haroenv
* [~] `ais-hierarchical-menu` vvo
* [ ] `ais-highlight` (there's no connector for this today)
* [x] `ais-hits-per-page`
* [x] `ais-hits`
* [x] `ais-index` (there's no connector for this today)
* [~] `ais-infinite-hits` samouss
* [x] `ais-menu-select`
* [ ] `ais-menu`
* [ ] `ais-numeric-menu`
* [ ] `ais-numeric-selector`
* [x] `ais-pagination`
* [ ] `ais-panel` (there's no connector for this today)
* [ ] `ais-powered-by`
* [ ] `ais-range-input`
* [ ] `ais-range-slider`
* [ ] `ais-rating-menu`
* [ ] `ais-refinement-list`
* [ ] `ais-search-box`
* [ ] `ais-snippet`
* [ ] `ais-sort-by`
* [x] `ais-stats`
* [ ] `ais-toggle-refinement`

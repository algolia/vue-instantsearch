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

- [x] `ais-breadcrumb`
- [x] `ais-clear-refinements`
- [x] `ais-configure`
- [x] `ais-current-refinements`
- [x] `ais-hierarchical-menu`
- [x] `ais-highlight`
  - Just a getter for \_highlightResult, doesn't set any parameters
- [x] `ais-hits-per-page`
- [x] `ais-hits`
- [x] `ais-index`
- [x] `ais-infinite-hits`
- [x] `ais-menu-select`
- [x] `ais-menu`
- [x] `ais-numeric-menu`
- [x] `ais-pagination`
- [x] `ais-panel`
- [x] `ais-powered-by`
- [x] `ais-range-input`
- [x] `ais-rating-menu`
- [x] `ais-refinement-list`
- [x] `ais-search-box`
- [x] `ais-snippet`
  - Just a getter for \_snippetResult, doesn't set any parameters
- [x] `ais-sort-by`
- [x] `ais-stats`
- [x] `ais-toggle-refinement`

## Which level of customization?

1.  there's a slot at the top level (always)
2.  every list as `item` as a slot (if makes sense, can be added after 2.0)

# Docs

- [x] `docs/src`
  - [x] `index.md`
  - [x] `advanced`
    - [x] `server-side-rendering.md`
    - [x] `multi-index-search.md`
    - [x] `custom-backend.md`
    - [x] `custom-components.md`
    - [x] `vue-router-url-sync.md`
    - [x] `integrate-with-nuxt.md`
  - [x] `components`
    - [x] `Stats.md`
    - [x] `HitsPerPage.md`
    - [x] `Menu.md`
    - [x] `SearchBox.md`
    - [x] `CurrentRefinements.md`
    - [x] `RatingMenu.md`
    - [x] `InfiniteHits.md`
    - [x] `MenuSelect.md`
    - [x] `ToggleRefinement.md`
    - [x] `Pagination.md`
    - [x] `Hits.md`
    - [x] `Highlight.md`
    - [x] `Panel.md`
    - [x] `SortBy.md`
    - [x] `HierarchicalMenu.md`
    - [x] `Autocomplete.md`
    - [x] `SearchState.md`
    - [x] `Configure.md`
    - [x] `ClearRefinements.md`
    - [x] `PoweredBy.md`
    - [x] `InstantSearch.md`
    - [x] `NumericMenu.md`
    - [x] `RangeInput.md`
    - [x] `Breadcrumb.md`
    - [x] `__Template__.md`
    - [x] `RefinementList.md`
    - [x] `Snippet.md`
  - [x] `getting-started`
    - [x] `installing.md.hbs`
    - [x] `best-practices.md`
    - [x] `migration.md`
    - [x] `getting-started.md`
    - [x] `using-components.md`
    - [x] `styling.md`
  - [x] `examples`
    - [x] `default-theme.md`
    - [x] `ecommerce.md`
    - [x] `media.md`

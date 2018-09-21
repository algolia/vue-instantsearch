import Component from './mixins/component';

import AisAutocomplete from './components/Autocomplete.vue';
import AisBreadcrumb from './components/Breadcrumb.vue';
import AisClearRefinements from './components/ClearRefinements.vue';
import AisConfigure from './components/Configure';
import AisCurrentRefinements from './components/CurrentRefinements.vue';
import AisHierarchicalMenu from './components/HierarchicalMenu.vue';
import AisHighlight from './components/Highlight.vue';
import AisHits from './components/Hits.vue';
import AisHitsPerPage from './components/HitsPerPage.vue';
import AisInstantSearch from './components/InstantSearch.vue';
import AisInfiniteHits from './components/InfiniteHits.vue';
import AisMenu from './components/Menu.vue';
import AisMenuSelect from './components/MenuSelect.vue';
import AisNumericMenu from './components/NumericMenu.vue';
import AisPagination from './components/Pagination.vue';
import AisPanel from './components/Panel.vue';
import AisPoweredBy from './components/PoweredBy.vue';
import AisRangeInput from './components/RangeInput.vue';
import AisRatingMenu from './components/RatingMenu.vue';
import AisRefinementList from './components/RefinementList.vue';
import AisSearchState from './components/SearchState.vue';
import AisSearchBox from './components/SearchBox.vue';
import AisSnippet from './components/Snippet.vue';
import AisSortBy from './components/SortBy.vue';
import AisStats from './components/Stats.vue';
import AisToggleRefinement from './components/ToggleRefinement.vue';

const InstantSearch = {
  Component,
  // widgets:
  AisAutocomplete,
  AisBreadcrumb,
  AisClearRefinements,
  AisConfigure,
  AisCurrentRefinements,
  AisHierarchicalMenu,
  AisHighlight,
  AisHits,
  AisHitsPerPage,
  AisInstantSearch,
  AisInfiniteHits,
  AisMenu,
  AisMenuSelect,
  AisNumericMenu,
  AisPagination,
  AisPanel,
  AisPoweredBy,
  AisRangeInput,
  AisRatingMenu,
  AisRefinementList,
  AisSearchState,
  AisSearchBox,
  AisSnippet,
  AisSortBy,
  AisStats,
  AisToggleRefinement,

  install(Vue) {
    Vue.component('ais-autocomplete', AisAutocomplete);
    Vue.component('ais-breadcrumb', AisBreadcrumb);
    Vue.component('ais-clear-refinements', AisClearRefinements);
    Vue.component('ais-configure', AisConfigure);
    Vue.component('ais-current-refinements', AisCurrentRefinements);
    Vue.component('ais-hierarchical-menu', AisHierarchicalMenu);
    Vue.component('ais-highlight', AisHighlight);
    Vue.component('ais-hits-per-page', AisHitsPerPage);
    Vue.component('ais-hits', AisHits);
    Vue.component('ais-instant-search', AisInstantSearch);
    Vue.component('ais-infinite-hits', AisInfiniteHits);
    Vue.component('ais-menu', AisMenu);
    Vue.component('ais-menu-select', AisMenuSelect);
    Vue.component('ais-numeric-menu', AisNumericMenu);
    Vue.component('ais-pagination', AisPagination);
    Vue.component('ais-panel', AisPanel);
    Vue.component('ais-powered-by', AisPoweredBy);
    Vue.component('ais-range-input', AisRangeInput);
    Vue.component('ais-rating-menu', AisRatingMenu);
    Vue.component('ais-refinement-list', AisRefinementList);
    Vue.component('ais-search-box', AisSearchBox);
    Vue.component('ais-search-state', AisSearchState);
    Vue.component('ais-snippet', AisSnippet);
    Vue.component('ais-sort-by', AisSortBy);
    Vue.component('ais-stats', AisStats);
    Vue.component('ais-toggle-refinement', AisToggleRefinement);
  },
};

export default InstantSearch;

export {
  AisAutocomplete,
  AisBreadcrumb,
  AisClearRefinements,
  AisConfigure,
  AisCurrentRefinements,
  AisHierarchicalMenu,
  AisHighlight,
  AisHits,
  AisHitsPerPage,
  AisInstantSearch,
  AisInfiniteHits,
  AisMenu,
  AisMenuSelect,
  AisNumericMenu,
  AisPagination,
  AisPanel,
  AisPoweredBy,
  AisRangeInput,
  AisRatingMenu,
  AisRefinementList,
  AisSearchState,
  AisSearchBox,
  AisSnippet,
  AisSortBy,
  AisStats,
  AisToggleRefinement,
};

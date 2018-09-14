import Component from './mixins/component';

import Autocomplete from './components/Autocomplete.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import ClearRefinements from './components/ClearRefinements.vue';
import Configure from './components/Configure.vue';
import CurrentRefinements from './components/CurrentRefinements.vue';
import HierarchicalMenu from './components/HierarchicalMenu.vue';
import Highlight from './components/Highlight.vue';
import Hits from './components/Hits.vue';
import HitsPerPage from './components/HitsPerPage.vue';
import Index from './components/Index.vue';
import InfiniteHits from './components/InfiniteHits.vue';
import Menu from './components/Menu.vue';
import MenuSelect from './components/MenuSelect.vue';
import NumericMenu from './components/NumericMenu.vue';
import Pagination from './components/Pagination.vue';
import Panel from './components/Panel.vue';
import PoweredBy from './components/PoweredBy.vue';
import RangeInput from './components/RangeInput.vue';
import RatingMenu from './components/RatingMenu.vue';
import RefinementList from './components/RefinementList.vue';
import SearchState from './components/SearchState.vue';
import SearchBox from './components/SearchBox.vue';
import Snippet from './components/Snippet.vue';
import SortBy from './components/SortBy.vue';
import Stats from './components/Stats.vue';
import ToggleRefinement from './components/ToggleRefinement.vue';

const InstantSearch = {
  Component,
  // widgets:
  Autocomplete,
  Breadcrumb,
  ClearRefinements,
  Configure,
  CurrentRefinements,
  HierarchicalMenu,
  Highlight,
  Hits,
  HitsPerPage,
  Index,
  InfiniteHits,
  Menu,
  MenuSelect,
  NumericMenu,
  Pagination,
  Panel,
  PoweredBy,
  RangeInput,
  RatingMenu,
  RefinementList,
  SearchState,
  SearchBox,
  Snippet,
  SortBy,
  Stats,
  ToggleRefinement,

  install(Vue) {
    Vue.component('ais-autocomplete', Autocomplete);
    Vue.component('ais-breadcrumb', Breadcrumb);
    Vue.component('ais-clear-refinements', ClearRefinements);
    Vue.component('ais-configure', Configure);
    Vue.component('ais-current-refinements', CurrentRefinements);
    Vue.component('ais-hierarchical-menu', HierarchicalMenu);
    Vue.component('ais-highlight', Highlight);
    Vue.component('ais-hits-per-page', HitsPerPage);
    Vue.component('ais-hits', Hits);
    Vue.component('ais-index', Index);
    Vue.component('ais-infinite-hits', InfiniteHits);
    Vue.component('ais-menu', Menu);
    Vue.component('ais-menu-select', MenuSelect);
    Vue.component('ais-numeric-menu', NumericMenu);
    Vue.component('ais-pagination', Pagination);
    Vue.component('ais-panel', Panel);
    Vue.component('ais-powered-by', PoweredBy);
    Vue.component('ais-range-input', RangeInput);
    Vue.component('ais-rating-menu', RatingMenu);
    Vue.component('ais-refinement-list', RefinementList);
    Vue.component('ais-search-box', SearchBox);
    Vue.component('ais-search-state', SearchState);
    Vue.component('ais-snippet', Snippet);
    Vue.component('ais-sort-by', SortBy);
    Vue.component('ais-stats', Stats);
    Vue.component('ais-toggle-refinement', ToggleRefinement);
  },
};

export default InstantSearch;

export {
  Autocomplete,
  Breadcrumb,
  ClearRefinements,
  Configure,
  CurrentRefinements,
  HierarchicalMenu,
  Highlight,
  Hits,
  HitsPerPage,
  Index,
  InfiniteHits,
  Menu,
  MenuSelect,
  NumericMenu,
  Pagination,
  Panel,
  PoweredBy,
  RangeInput,
  RatingMenu,
  RefinementList,
  SearchState,
  SearchBox,
  Snippet,
  SortBy,
  Stats,
  ToggleRefinement,
};

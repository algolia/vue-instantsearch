import {
  FACET_AND,
  FACET_OR,
  FACET_TREE,
  createFromAlgoliaCredentials,
  createFromAlgoliaClient,
  createFromSerialized,
  Store,
} from './store';

import Component from './component';

import Index from './components/Index.vue';
import Highlight from './components/Highlight';
import Snippet from './components/Snippet';
import Input from './components/Input.vue';
import Results from './components/Results.vue';
import Stats from './components/Stats.vue';
import Configure from './components/Configure.vue';
import Pagination from './components/Pagination.vue';
import TreeMenu from './components/TreeMenu.vue';
import Menu from './components/Menu.vue';
import SortBySelector from './components/SortBySelector.vue';
import SearchBox from './components/SearchBox.vue';
import ClearRefinements from './components/ClearRefinements.vue';
import Rating from './components/Rating.vue';
import RangeInput from './components/RangeInput.vue';
import NoResults from './components/NoResults.vue';
import RefinementList from './components/RefinementList.vue';
import PriceRange from './components/PriceRange.vue';
import PoweredBy from './components/PoweredBy.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import CurrentRefinements from './components/CurrentRefinements.vue';
import HierarchicalMenu from './components/HierarchicalMenu.vue';
import HitsPerPage from './components/HitsPerPage.vue';

const InstantSearch = {
  Index,
  Highlight,
  Snippet,
  Input,
  Configure,
  Results,
  Stats,
  Pagination,
  TreeMenu,
  Menu,
  SortBySelector,
  SearchBox,
  ClearRefinements,
  Rating,
  RangeInput,
  NoResults,
  RefinementList,
  PriceRange,
  PoweredBy,
  Breadcrumb,
  CurrentRefinements,
  HierarchicalMenu,
  HitsPerPage,

  install(Vue) {
    Vue.component('ais-index', Index);
    Vue.component('ais-highlight', Highlight);
    Vue.component('ais-snippet', Snippet);
    Vue.component('ais-input', Input);
    Vue.component('ais-results', Results);
    Vue.component('ais-stats', Stats);
    Vue.component('ais-pagination', Pagination);
    Vue.component('ais-tree-menu', TreeMenu);
    Vue.component('ais-menu', Menu);
    Vue.component('ais-sort-by-selector', SortBySelector);
    Vue.component('ais-search-box', SearchBox);
    Vue.component('ais-clear-refinements', ClearRefinements);
    Vue.component('ais-configure', Configure);
    Vue.component('ais-rating', Rating);
    Vue.component('ais-range-input', RangeInput);
    Vue.component('ais-no-results', NoResults);
    Vue.component('ais-refinement-list', RefinementList);
    Vue.component('ais-price-range', PriceRange);
    Vue.component('ais-powered-by', PoweredBy);
    Vue.component('ais-breadcrumb', Breadcrumb);
    Vue.component('ais-current-refinements', CurrentRefinements);
    Vue.component('ais-hierarchical-menu', HierarchicalMenu);
    Vue.component('ais-hits-per-page', HitsPerPage);
  },
};

export default InstantSearch;

export {
  Component,
  FACET_AND,
  FACET_OR,
  FACET_TREE,
  createFromAlgoliaCredentials,
  createFromAlgoliaClient,
  createFromSerialized,
  Store,
  Index,
  Highlight,
  Snippet,
  Input,
  Results,
  Stats,
  Pagination,
  TreeMenu,
  Menu,
  SortBySelector,
  SearchBox,
  ClearRefinements,
  Rating,
  RangeInput,
  NoResults,
  RefinementList,
  PriceRange,
  PoweredBy,
  HitsPerPage,
};

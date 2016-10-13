import {Store, instance, FACET_CONJUNCTIVE, FACET_DISJUNCTIVE, FACET_HIERARCHICAL} from './store'

import ClearSearch from './widgets/ClearSearch.vue'
import HitsPerPageSelector from './widgets/HitsPerPageSelector.vue'
import ListFacet from './widgets/ListFacet.vue'
import MenuFacet from './widgets/MenuFacet.vue'
import SearchInput from './widgets/SearchInput.vue'
import SearchPagination from './widgets/SearchPagination.vue'
import SearchResult from './widgets/SearchResult.vue'
import SearchResults from './widgets/SearchResults.vue'
import EmptySearchResults from './widgets/EmptySearchResults.vue'
import SearchStats from './widgets/SearchStats.vue'
import StarsFacet from './widgets/StarsFacet.vue'

module.exports = {
  Store,
  instance,
  FACET_CONJUNCTIVE,
  FACET_DISJUNCTIVE,
  FACET_HIERARCHICAL,

  ClearSearch,
  HitsPerPageSelector,
  ListFacet,
  MenuFacet,
  SearchInput,
  SearchPagination,
  SearchResult,
  SearchResults,
  EmptySearchResults,
  SearchStats,
  StarsFacet,

  install(Vue) {
    Vue.component('clear-search', ClearSearch)
    Vue.component('hits-per-page-selector', HitsPerPageSelector)
    Vue.component('list-facet', ListFacet)
    Vue.component('menu-facet', MenuFacet)
    Vue.component('search-input', SearchInput)
    Vue.component('search-pagination', SearchPagination)
    Vue.component('search-result', SearchResult)
    Vue.component('search-results', SearchResults)
    Vue.component('empty-search-results', EmptySearchResults)
    Vue.component('search-stats', SearchStats)
    Vue.component('stars-facet', StarsFacet)
  }
}

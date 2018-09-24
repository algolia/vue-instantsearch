import Vue from 'vue';
import InstantSearch from '../instantsearch';

test('Should register all components when installed', () => {
  Vue.component = jest.fn();
  Vue.use(InstantSearch);

  const allInstalledComponents = Vue.component.mock.calls.map(call => call[0]);

  expect(allInstalledComponents).toMatchInlineSnapshot(`
Array [
  "AisAutocomplete",
  "AisBreadcrumb",
  "AisClearRefinements",
  "AisConfigure",
  "AisCurrentRefinements",
  "AisHierarchicalMenu",
  "AisHighlight",
  "AisHits",
  "AisHitsPerPage",
  "AisInstantSearch",
  "AisInfiniteHits",
  "AisMenu",
  "AisMenuSelect",
  "AisNumericMenu",
  "AisPagination",
  "AisPanel",
  "AisPoweredBy",
  "AisRangeInput",
  "AisRatingMenu",
  "AisRefinementList",
  "AisSearchState",
  "AisSearchBox",
  "AisSnippet",
  "AisSortBy",
  "AisStats",
  "AisToggleRefinement",
]
`);
});

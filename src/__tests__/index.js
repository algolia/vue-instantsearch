/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
import Vue from 'vue';
import InstantSearch from '../instantsearch';

describe('installing the plugin', () => {
  Vue.component = jest.fn();
  Vue.use(InstantSearch);

  const allInstalledComponents = Vue.component.mock.calls;

  it('should register all components when installed', () => {
    expect(allInstalledComponents.map(([name, _component]) => name))
      .toMatchInlineSnapshot(`
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

  it('should have `name` the same as the suit class name everywhere', () => {
    const components = allInstalledComponents.map(
      ([installedName, { name, mixins }]) => {
        let suitClass = `Error! ${name} is missing the suit classes`;

        try {
          suitClass = mixins
            .find(mixin => mixin.methods && mixin.methods.suit)
            .methods.suit();
        } catch (e) {
          /* no suit class! */
        }

        return {
          installedName,
          name,
          suitClass,
        };
      }
    );

    components.forEach(({ name, installedName, suitClass }) => {
      expect(installedName).toBe(name);
      expect(suitClass).toBe(`ais-${name.substr(3)}`);
    });
  });
});

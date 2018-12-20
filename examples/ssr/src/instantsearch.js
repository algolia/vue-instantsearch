import instantsearch from 'instantsearch.js/es/index';
import algoliaHelper from 'algoliasearch-helper';

export const createInstantSearch = ({ searchClient, indexName, options }) => {
  const search = instantsearch({
    searchClient,
    indexName,
    ...options,
  });

  search._isSsr = true;

  search.ssr = async params => {
    search.helper = algoliaHelper(searchClient, indexName, {
      // parameters set by default
      highlightPreTag: '__ais-highlight__',
      highlightPostTag: '__/ais-highlight__',
      ...params,
    });

    const { content: lastResults } = await search.helper.searchOnce();

    // TODO: maybe use the life cycle version?
    search.helper.lastResults = lastResults;

    return {
      ais: {
        lastResults: JSON.parse(JSON.stringify(lastResults)),
      },
    };
  };

  search.giveRenderPropsServerOrSomething = widget => {
    widget.init({
      state: search.helper.lastResults._state,
      helper: search.helper,
      templatesConfig: {},
      createURL: () => '#',
      onHistoryChange: () => {},
      instantSearchInstance: search,
    });

    widget.render({
      state: search.helper.lastResults._state,
      results: search.helper.lastResults,
      helper: search.helper,
      templatesConfig: {},
      createURL: () => '#',
      instantSearchInstance: search,
      searchMetadata: {
        isSearchStalled: false,
      },
    });
  };

  search.giveRenderPropsClientOrSomething = widget => {
    widget.render({
      state: search.helper.lastResults._state,
      results: search.helper.lastResults,
      helper: search.helper,
      templatesConfig: {},
      createURL: () => '#',
      instantSearchInstance: search,
      searchMetadata: {
        isSearchStalled: false,
      },
    });
  };

  search.injectOrHydrate = () => {
    if (window.__ALGOLIA_STATE__) {
      const { lastResults } = window.__ALGOLIA_STATE__;
      search.searchParameters = lastResults._state;
      search.helper = algoliaHelper(
        searchClient,
        indexName,
        lastResults._state
      );
      search.helper.lastResults = lastResults;
      // TODO: set the search results, and use those for the initial "search"
      // not doing that yet is what causes the flash of no content
      // delete window.__ALGOLIA_STATE__;
    }
  };

  search.injectToRootOrProvideOrSomethingMaybeAMixin = () => ({
    provide() {
      return {
        $_ais: search,
      };
    },
  });

  search.injectSsrOrSomethingServer = ({ components, context }) => {
    const aisComponents = components.filter(comp => comp && comp.ais);
    if (aisComponents.length > 1) {
      throw new Error('only one InstantSearch instance is allowed');
    }

    if (aisComponents[0]) {
      context.ais = { ...aisComponents[0].ais };
    }
  };

  return search;
};

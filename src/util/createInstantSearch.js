import instantsearch from 'instantsearch.js/es';
import algoliaHelper from 'algoliasearch-helper';
const { SearchParameters, SearchResults } = algoliaHelper;
import { _objectSpread } from './polyfills';
import { warn } from './warn';

export const createInstantSearch = instantSearchOptions => {
  const search = instantsearch(instantSearchOptions);
  const { searchClient, indexName, initialUiState } = instantSearchOptions;

  let derivedHelpers;

  // main API for SSR, called in asyncData of a root component which contains instantsearch
  search.findResultsState = function(uiStateMapping) {
    const rootIndexParams = uiStateMapping[indexName];

    const helper = algoliaHelper(
      searchClient,
      indexName,
      _objectSpread({}, rootIndexParams, {
        // parameters set by default
        highlightPreTag: '__ais-highlight__',
        highlightPostTag: '__/ais-highlight__',
      })
    );

    derivedHelpers = Object.keys(uiStateMapping).reduce((acc, indexId) => {
      // eslint-disable-next-line no-param-reassign
      acc[indexId] = helper.derive(
        () =>
          new algoliaHelper.SearchParameters(
            _objectSpread({}, uiStateMapping[indexId], {
              // parameters set by default
              highlightPreTag: '__ais-highlight__',
              highlightPostTag: '__/ais-highlight__',
            })
          )
      );
      return acc;
    }, {});

    helper.searchOnlyWithDerivedHelpers();

    return new Promise((resolve, reject) => {
      // possible bug if something changes on the helper:
      // we only wait for the result of the main derived helper,
      // assuming _all_ results happen in the same tick
      derivedHelpers[indexName].on('error', reject);
      derivedHelpers[indexName].on('result', resolve);
    }).then(() => {
      // TODO: do we need this for anything else than our own warning?
      search.helper = helper;
      search.mainHelper = search.helper;
      // set so root widgets, which don't have an ais-index, can render
      search.helper.lastResults = derivedHelpers[indexName].lastResults;

      // init main index here, so force render later works as expected
      // because main index isn't a vue widget and doesn't get __forceRender
      search.mainIndex.init({
        instantSearchInstance: search,
        parent: null,
        uiState: initialUiState,
      });
      // force set last results on derived helper, since we search before init
      // TODO: PR for hydrate on index widget
      search.mainIndex.hydrate(derivedHelpers[indexName].lastResults);
    });
  };

  // make sure correct data is available in each widget's state
  // called in widget mixin with (this.widget, this)
  search.__forceRender = (widget, componentInstance) => {
    if (!search.helper) {
      warn(
        '`instantsearch.findResultsState()` needs to be called when using `ais-instant-search-ssr`.'
      );
      return;
    }

    const parentIndex = componentInstance.getParentIndex();
    const rootIndex = componentInstance.instantSearchInstance;

    const parent = parentIndex !== rootIndex ? parentIndex : null;
    const uiState = initialUiState;

    // API to get helper & state is different for InstantSearch as Index widget
    // so we need to call those conditionally only if parentIndex is the widget
    const helper = parent ? parent.getHelper() : search.helper;
    const results = parent ? parent.getResults() : search.helper.lastResults;
    const state = results._state;

    widget.init({
      helper,
      state,
      templatesConfig: {},
      createURL: () => '#',
      onHistoryChange: () => {},
      instantSearchInstance: search,
      parent,
      uiState,
    });

    if (widget.$$type === 'ais.index') {
      // TODO: requires API in index widget
      widget.hydrate(derivedHelpers[widget.getIndexId()].lastResults);
    }

    widget.render({
      helper,
      results,
      state,
      templatesConfig: {},
      // TODO: use memory or real router
      createURL: () => '#',
      instantSearchInstance: search,
      searchMetadata: {
        isSearchStalled: false,
      },
    });
  };

  search.getState = () => {
    if (search.helper === null || !search.helper.lastResults) {
      return undefined;
    }
    return {
      lastResults: JSON.parse(JSON.stringify(search.helper.lastResults)),
      derived: JSON.parse(
        JSON.stringify(
          Object.keys(derivedHelpers).reduce((acc, indexId) => {
            // eslint-disable-next-line no-param-reassign
            acc[indexId] = derivedHelpers[indexId].lastResults;
            return acc;
          }, {})
        )
      ),
    };
  };

  // called before app mounts on client
  search.hydrate = instantSearchState => {
    if (!instantSearchState || !instantSearchState.lastResults) {
      warn('The result of `getState()` needs to be passed to `hydrate()`.');
      return;
    }
    const { lastResults, derived } = instantSearchState;
    search.helper = algoliaHelper(searchClient, indexName, lastResults._state);
    search.helper.lastResults = new SearchResults(
      new SearchParameters(lastResults._state),
      lastResults._rawResults
    );

    // TODO: this is still causing _two_ close to identical requests on the frontend
    // maybe a mismatch of parameters.
    derivedHelpers = Object.keys(derived).reduce((acc, indexId) => {
      if (indexId === indexName) {
        return acc;
      }

      // eslint-disable-next-line no-param-reassign
      acc[indexId] = {
        // __forceRender uses lastResults only, we don't want to duplicate
        // the requests by doing a full derive here.
        lastResults: new SearchResults(
          new SearchParameters(derived[indexId]._state),
          derived[indexId]._rawResults
        ),
      };

      return acc;
    }, {});

    search.mainHelper = search.helper;

    search.hydrated = true;
  };

  // put this in the user's root Vue instance
  // we can then reuse that InstantSearch instance seamlessly from `ais-instant-search-ssr`
  const rootMixin = {
    provide() {
      return {
        $_ais: search,
      };
    },
  };

  return {
    instantsearch: search,
    rootMixin,
  };
};

import Vue from 'vue';
import _renderToString from 'vue-server-renderer/basic';
import instantsearch from 'instantsearch.js/es';
import algoliaHelper from 'algoliasearch-helper';
const { SearchResults, SearchParameters } = algoliaHelper;
import { warn } from './warn';

function walkIndex(indexWidget, visit) {
  visit(indexWidget);

  return indexWidget.getWidgets().forEach(widget => {
    if (widget.$$type !== 'ais.index') return;
    visit(widget);
    walkIndex(widget, visit);
  });
}

function renderToString(app) {
  return new Promise((resolve, reject) =>
    _renderToString(app, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  );
}

function searchOnlyWithDerivedHelpers(helper) {
  return new Promise((resolve, reject) => {
    helper.searchOnlyWithDerivedHelpers();

    // we assume all derived helpers resolve at least in the same tick
    helper.derivedHelpers[0].on('result', e => {
      resolve(e);
    });

    helper.derivedHelpers.forEach(derivedHelper =>
      derivedHelper.on('error', e => {
        reject(e);
      })
    );
  });
}

function augmentInstantSearch(search, searchClient, indexName) {
  /* eslint-disable no-param-reassign */

  const helper = algoliaHelper(searchClient, indexName);

  /**
   * main API for SSR, called in asyncData of a root component which contains instantsearch
   * @param {object} componentInstance the calling component's `this`
   * @returns {Promise<void>} xx
   */
  // TODO: maybe play with .call / .apply
  search.findResultsState = function(componentInstance) {
    let app;
    return Promise.resolve()
      .then(() => {
        // componentInstance.$vnode.componentOptions.Ctor.options.fetch = () => {};
        // componentInstance.$vnode.componentOptions.Ctor.options.serverPrefetch = [];

        const extended = componentInstance.$vnode.componentOptions.Ctor.extend({
          name: 'ais-ssr-root-component',
        });

        // TODO: one of these options is needed to prevent Nuxt's "fetch" from causing infinite loops
        // extended.options.fetch = undefined;
        // extended.options.serverPrefetch = undefined;
        // extended.options._fetchOnServer = false;
        // extended.superOptions = {};

        app = new Vue(extended);

        app.$options.serverPrefetch = [];
        // app.$options.fetch = () => {};
        // app._fetchOnServer = false;
        // app.$options._base.__nuxt__fetch__mixin__ = false;
        // app.$options._fetchOnServer = false;

        app.instantsearch.helper = helper;
        app.instantsearch.mainHelper = helper;

        app.instantsearch.mainIndex.init({
          instantSearchInstance: app.instantsearch,
          parent: null,
          // TODO: public api?
          uiState: app.instantsearch._initialUiState,
        });
      })
      .then(() => renderToString(app))
      .then(() => searchOnlyWithDerivedHelpers(helper))
      .then(() => {
        const results = {};
        walkIndex(app.instantsearch.mainIndex, widget => {
          results[widget.getIndexId()] = widget.getResults();
        });

        search.hydrate(results);

        // TODO: leaner serialization, we only need _rawResults & _state as json
        return Object.keys(results)
          .map(indexId => {
            const { _state, _rawResults } = results[indexId];
            return [
              indexId,
              {
                // __identifier: 'stringified',
                // TODO: more efficient way with looping maybe?
                _state: JSON.parse(JSON.stringify(_state)),
                _rawResults,
              },
            ];
          })
          .reduce(
            (acc, [key, val]) => {
              acc[key] = val;
              return acc;
            },
            {
              __identifier: 'stringified',
            }
          );
      });
  };

  /**
   * make sure correct data is available in each widget's state.
   * called in widget mixin with (this.widget, this)
   *
   * @param {object} widget The widget instance
   * @param {object} parent The local parent index
   * @returns {void}
   */
  search.__forceRender = function(widget, parent) {
    const localHelper = parent.getHelper();

    // TODO: maybe move this code to index widget?
    const results = search.__initialSearchResults[parent.getIndexId()];

    const state = results._state;

    // helper gets created in init, but that means it doesn't get the injected
    // parameters, because those are from the lastResults
    localHelper.state = state;

    // TODO: copied from index widget, should be given to all widgets IMO
    const createURL = nextState =>
      search._createURL({
        [parent.getIndexId()]: parent
          .getWidgets()
          .filter(w => w.$$type !== 'ais.index')
          .reduce((uiState, w) => {
            if (!widget.getWidgetState) {
              return uiState;
            }

            return w.getWidgetState(uiState, {
              searchParameters: nextState,
              helper: localHelper,
            });
          }, {}),
      });

    widget.render({
      helper: localHelper,
      results,
      state,
      templatesConfig: {},
      createURL,
      instantSearchInstance: search,
      searchMetadata: {
        isSearchStalled: false,
      },
    });
  };

  /**
   * Called both in server
   * @param {object} results a map of indexId: SearchResults
   * @returns {void}
   */
  search.hydrate = function(results) {
    if (!results) {
      warn(
        'The result of `findResultsState()` needs to be passed to `hydrate()`.'
      );
      return;
    }

    const initialResults =
      results.__identifier === 'stringified'
        ? Object.keys(results).reduce((acc, indexId) => {
            if (indexId === '__identifier') {
              return acc;
            }
            acc[indexId] = new SearchResults(
              new SearchParameters(results[indexId]._state),
              results[indexId]._rawResults
            );
            return acc;
          }, {})
        : results;

    // TODO: either a real API or a different global
    search.__initialSearchResults = initialResults;

    search.helper = helper;
    search.mainHelper = helper;

    search.mainIndex.init({
      instantSearchInstance: search,
      parent: null,
      // TODO: make this public?
      uiState: search._initialUiState,
    });
  };

  /* eslint-enable no-param-reassign */
  return search;
}

export function createServerRootMixin(instantSearchOptions = {}) {
  const { searchClient, indexName } = instantSearchOptions;

  if (!searchClient || !indexName) {
    throw new Error(
      'createServerRootMixin requires the `searchClient` and `indexName` arguments to be passed'
    );
  }

  // put this in the user's root Vue instance
  // we can then reuse that InstantSearch instance seamlessly from `ais-instant-search-ssr`
  const rootMixin = {
    provide() {
      return {
        $_ais_ssrInstantSearchInstance: this.instantsearch,
      };
    },
    data() {
      return {
        // this is in data, so that the real & duplicated render do not share
        // the same instantsearch instance.
        instantsearch: augmentInstantSearch(
          instantsearch(instantSearchOptions),
          searchClient,
          indexName
        ),
      };
    },
  };

  return rootMixin;
}

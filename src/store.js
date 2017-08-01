import algolia from 'algoliasearch/lite';
import algoliaHelper from 'algoliasearch-helper';
import { version } from '../package.json';
import {
  serialize as serializeHelper,
  deserialize as deserializeHelper,
} from './helper-serializer';

import sanitizeResults from './sanitize-results';

export const FACET_AND = 'and';
export const FACET_OR = 'or';
export const FACET_TREE = 'tree';

export const HIGHLIGHT_PRE_TAG = '__ais-highlight__';
export const HIGHLIGHT_POST_TAG = '__/ais-highlight__';

export const assertValidFacetType = function(type) {
  if (type === FACET_AND) return;
  if (type === FACET_OR) return;
  if (type === FACET_TREE) return;

  throw new Error(`Invalid facet type ${type}.`);
};

const onHelperChange = function() {
  if (this._stoppedCounter === 0) {
    this.refresh();
  }
};

const onHelperResult = function(response) {
  this._results = sanitizeResults(
    response.hits,
    HIGHLIGHT_PRE_TAG,
    HIGHLIGHT_POST_TAG,
    this.highlightPreTag,
    this.highlightPostTag
  );
};

export class Store {
  constructor(helper) {
    if (!(helper instanceof algoliaHelper.AlgoliaSearchHelper)) {
      throw new TypeError(
        'Store should be constructed with an AlgoliaSearchHelper instance as first parameter.'
      );
    }
    // We require one start() call to execute the first search query.
    // Allows every widget to alter the state at initialization
    // without trigger multiple queries.
    this._stoppedCounter = 1;

    this._highlightPreTag = '<em>';
    this._highlightPostTag = '</em>';

    this.algoliaHelper = helper;
  }

  set algoliaHelper(helper) {
    if (this._helper) {
      this._helper.removeListener('change', onHelperChange);
      this._helper.removeListener('result', onHelperResult);
    }

    this._helper = helper;

    // Here we enforce custom highlight tags for handling XSS protection.
    // We also make sure that we keep the current page as setQueryParameter resets it.
    const page = this._helper.getPage();
    this._helper.setQueryParameter('highlightPreTag', HIGHLIGHT_PRE_TAG);
    this._helper.setQueryParameter('highlightPostTag', HIGHLIGHT_POST_TAG);
    this._helper.setPage(page);

    if (this._helper.lastResults) {
      onHelperResult.apply(this, [this._helper.lastResults]);
    } else {
      this._results = [];
    }

    this._helper.on('change', onHelperChange.bind(this));
    this._helper.on('result', onHelperResult.bind(this));

    this._helper.getClient().addAlgoliaAgent(`vue-instantsearch ${version}`);
  }

  get algoliaHelper() {
    return this._helper;
  }

  get highlightPreTag() {
    return this._highlightPreTag;
  }

  set highlightPreTag(tag) {
    this._highlightPreTag = tag;
  }

  get highlightPostTag() {
    return this._highlightPostTag;
  }

  set highlightPostTag(tag) {
    this._highlightPostTag = tag;
  }

  set algoliaClient(algoliaClient) {
    this._helper.setClient(algoliaClient);

    // Manually trigger the change given the helper doesn't emit a change event
    // when a new client is set.
    onHelperChange();
  }

  get algoliaClient() {
    return this._helper.getClient();
  }

  get algoliaApiKey() {
    return this.algoliaClient.apiKey;
  }

  get algoliaAppId() {
    return this.algoliaClient.applicationID;
  }

  // Todo: maybe freeze / unfreeze, pause / resume are better names
  start() {
    if (this._stoppedCounter < 1) {
      this._stoppedCounter = 0;
    } else {
      this._stoppedCounter--;
    }

    if (this._stoppedCounter === 0) {
      this.refresh();
    }
  }

  stop() {
    this._stoppedCounter++;
  }

  set indexName(index) {
    this._helper.setIndex(index);
  }

  get indexName() {
    return this._helper.getIndex();
  }

  set resultsPerPage(count) {
    this._helper.setQueryParameter('hitsPerPage', count);
  }

  get resultsPerPage() {
    const resultsPerPage = this._helper.getQueryParameter('hitsPerPage');

    if (resultsPerPage) {
      return resultsPerPage;
    }

    return this._helper.lastResults ? this._helper.lastResults.hitsPerPage : 0;
  }

  get results() {
    return this._results;
  }

  get page() {
    return this._helper.getPage() + 1;
  }

  set page(page) {
    this._helper.setPage(page - 1);
  }

  get totalPages() {
    if (!this._helper.lastResults) {
      return 0;
    }

    return this._helper.lastResults.nbPages;
  }

  get totalResults() {
    if (!this._helper.lastResults) {
      return 0;
    }

    return this._helper.lastResults.nbHits;
  }

  get processingTimeMS() {
    if (!this._helper.lastResults) {
      return 0;
    }

    return this._helper.lastResults.processingTimeMS;
  }

  // todo: change to goToFirstPage()
  goTofirstPage() {
    this.page = 0;
  }

  goToPreviousPage() {
    this._helper.previousPage();
  }

  goToNextPage() {
    this._helper.nextPage();
  }

  goToLastPage() {
    this.page = this.nbPages - 1;
  }

  addFacet(attribute, type = FACET_AND) {
    assertValidFacetType(type);

    this.stop();

    let state = null;
    if (type === FACET_AND) {
      if (!this._helper.state.isConjunctiveFacet(attribute)) {
        this.removeFacet(attribute);
        state = this._helper.state.addFacet(attribute);
      }
    } else if (type === FACET_OR) {
      if (!this._helper.state.isDisjunctiveFacet(attribute)) {
        this.removeFacet(attribute);
        state = this._helper.state.addDisjunctiveFacet(attribute);
      }
    } else if (type === FACET_TREE) {
      if (!this._helper.state.isHierarchicalFacet(attribute.name)) {
        this.removeFacet(attribute.name);
        state = this._helper.state.addHierarchicalFacet(attribute);
      }
    }

    if (state !== null) {
      this._helper.setState(state);
    }
    this.start();
  }

  removeFacet(attribute) {
    let state = null;

    if (this._helper.state.isConjunctiveFacet(attribute)) {
      state = this._helper.state.removeFacet(attribute);
    } else if (this._helper.state.isDisjunctiveFacet(attribute)) {
      state = this._helper.state.removeDisjunctiveFacet(attribute);
    } else if (this._helper.state.isHierarchicalFacet(attribute)) {
      state = this._helper.state.removeHierarchicalFacet(attribute);
    } else {
      return;
    }

    this._helper.setState(state);
  }

  addFacetRefinement(attribute, value) {
    if (this._helper.state.isConjunctiveFacet(attribute)) {
      this._helper.addFacetRefinement(attribute, value);
    } else if (this._helper.state.isDisjunctiveFacet(attribute)) {
      this._helper.addDisjunctiveFacetRefinement(attribute, value);
    } else if (this._helper.state.isHierarchicalFacet(attribute)) {
      this._helper.addHierarchicalFacetRefinement(attribute, value);
    }
  }

  toggleFacetRefinement(facet, value) {
    this._helper.toggleRefinement(facet, value);
  }

  clearRefinements(attribute) {
    this._helper.clearRefinements(attribute);
  }

  getFacetValues(attribute, sortBy, limit = -1) {
    if (!this._helper.lastResults) {
      return [];
    }

    let values;
    try {
      values = this._helper.lastResults.getFacetValues(attribute, {
        sortBy,
      });
    } catch (e) {
      values = [];
    }

    if (limit === -1) {
      return values;
    }

    return values.slice(0, limit);
  }

  get activeRefinements() {
    if (!this._helper.lastResults) {
      return [];
    }

    return this._helper.lastResults.getRefinements();
  }

  addNumericRefinement(attribute, operator, value) {
    this._helper.addNumericRefinement(attribute, operator, value);
  }

  removeNumericRefinement(attribute, operator, value) {
    this._helper.removeNumericRefinement(attribute, operator, value);
  }

  set query(query) {
    if (this._helper.state.query === query) {
      return;
    }
    this._helper.setQuery(query);
  }

  get query() {
    return this._helper.state.query;
  }

  set queryParameters(parameters) {
    /* eslint-disable no-param-reassign */
    // Todo: this should be rewritten to be non-mutating method
    this.stop();
    for (const parameter in parameters) {
      if (parameters[parameter] === null) {
        parameters[parameter] = undefined;
      }
      this._helper.setQueryParameter(parameter, parameters[parameter]);
    }

    // Make sure page starts at 1.
    if ('page' in parameters) {
      this.page = parameters.page;
      delete parameters.page;
    }
    this.start();
  }

  get queryParameters() {
    const parameters = this._helper.state.getQueryParams();
    parameters.page = this.page;

    return parameters;
  }

  get searchParameters() {
    return Object.assign({}, this._helper.state, { page: this.page });
  }

  set searchParameters(searchParameters) {
    const params = Object.assign({}, searchParameters);
    if (params.page !== undefined) {
      params.page = params.page - 1;
    }
    const newSearchParameters = algoliaHelper.SearchParameters.make(params);
    this._helper.setState(newSearchParameters);
  }

  serialize() {
    return {
      helper: serializeHelper(this._helper),
      highlightPreTag: this.highlightPreTag,
      highlightPostTag: this.highlightPostTag,
    };
  }

  // Todo: find a better name for this function.
  refresh() {
    this._helper.search();
  }

  waitUntilInSync() {
    return new Promise((resolve, reject) => {
      if (this._helper.hasPendingRequests() === false) {
        resolve();
        return;
      }

      const resolvePromise = () => {
        this._helper.removeListener('error', rejectPromise);
        resolve();
      };

      const rejectPromise = error => {
        this._helper.removeListener('searchQueueEmpty', resolvePromise);
        reject(error);
      };

      this._helper.once('searchQueueEmpty', resolvePromise);
      this._helper.once('error', rejectPromise);
    });
  }
}

export const createFromAlgoliaCredentials = (appID, apiKey) => {
  const client = algolia(appID, apiKey);
  const helper = algoliaHelper(client);

  return new Store(helper);
};

export const createFromAlgoliaClient = client => {
  const helper = algoliaHelper(client);

  return new Store(helper);
};

export const createFromSerialized = data => {
  const helper = deserializeHelper(data.helper);

  const store = new Store(helper);
  store.highlightPreTag = data.highlightPreTag;
  store.highlightPostTag = data.highlightPostTag;

  return store;
};

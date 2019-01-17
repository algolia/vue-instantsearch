import { createInstantSearch } from '../createInstantSearch';

const createSerializedState = () => ({
  lastResults: {
    _rawResults: [
      {
        hits: [
          {
            objectID: 'doggos',
            name: 'the dog',
          },
        ],
        nbHits: 1071,
        page: 0,
        nbPages: 200,
        hitsPerPage: 5,
        processingTimeMS: 3,
        facets: {
          genre: {
            Comedy: 1071,
            Drama: 290,
            Romance: 202,
          },
        },
        exhaustiveFacetsCount: true,
        exhaustiveNbHits: true,
        query: 'hi',
        queryAfterRemoval: 'hi',
        params:
          'query=hi&hitsPerPage=5&page=0&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%22genre%22%5D&tagFilters=&facetFilters=%5B%5B%22genre%3AComedy%22%5D%5D',
        index: 'movies',
      },
      {
        hits: [{ objectID: 'doggos' }],
        nbHits: 5131,
        page: 0,
        nbPages: 1000,
        hitsPerPage: 1,
        processingTimeMS: 7,
        facets: {
          genre: {
            Comedy: 1071,
            Drama: 1642,
            Romance: 474,
          },
        },
        exhaustiveFacetsCount: true,
        exhaustiveNbHits: true,
        query: 'hi',
        queryAfterRemoval: 'hi',
        params:
          'query=hi&hitsPerPage=1&page=0&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=genre',
        index: 'movies',
      },
    ],
    query: 'hi',
    hits: [
      {
        objectID: 'doggos',
        name: 'the dog',
      },
    ],
    index: 'movies',
    hitsPerPage: 5,
    nbHits: 1071,
    nbPages: 200,
    page: 0,
    processingTimeMS: 10,
    exhaustiveFacetsCount: true,
    exhaustiveNbHits: true,
    disjunctiveFacets: [
      {
        name: 'genre',
        data: {
          Comedy: 1071,
          Drama: 1642,
          Romance: 474,
        },
        exhaustive: true,
      },
    ],
    hierarchicalFacets: [],
    facets: [],
    _state: {
      index: 'movies',
      query: 'hi',
      facets: [],
      disjunctiveFacets: ['genre'],
      hierarchicalFacets: [],
      facetsRefinements: {},
      facetsExcludes: {},
      disjunctiveFacetsRefinements: { genre: ['Comedy'] },
      numericRefinements: {},
      tagRefinements: [],
      hierarchicalFacetsRefinements: {},
      hitsPerPage: 5,
      page: 0,
      highlightPreTag: '__ais-highlight__',
      highlightPostTag: '__/ais-highlight__',
    },
  },
});

describe('rootMixin', () => {
  it('provides the search instance as $_ais', () => {
    const { rootMixin, instantsearch } = createInstantSearch({
      searchClient: {},
      indexName: 'bla',
    });
    expect(rootMixin.provide().$_ais).toBe(instantsearch);
  });
});

describe('findResultsState', () => {
  it('returns `ais` with lastResults', async () => {
    const searchClient = {
      search: jest.fn(({ query }) => Promise.resolve({ results: [{ query }] })),
    };
    const { instantsearch } = createInstantSearch({
      searchClient,
      indexName: 'bla',
    });

    await instantsearch.findResultsState({
      query: 'hi there!',
    });

    expect(instantsearch.getState()).toEqual({
      lastResults: expect.objectContaining({
        _state: expect.objectContaining({
          query: 'hi there!',
          index: 'bla',
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
        }),
      }),
    });
  });
});

describe('instantsearch.__forceRender', () => {
  const { instantsearch } = createInstantSearch({
    searchClient: {},
    indexName: 'bla',
  });

  instantsearch.helper.lastResults = { _state: {} };

  const widget = {
    init: jest.fn(),
    render: jest.fn(),
  };

  instantsearch.__forceRender(widget);

  const initArgs = widget.init.mock.calls[0][0];
  const renderArgs = widget.render.mock.calls[0][0];

  it('calls init & render on widget', () => {
    expect(widget.init).toBeCalledTimes(1);
    expect(widget.render).toBeCalledTimes(1);

    expect(initArgs).toMatchInlineSnapshot(
      {
        helper: expect.any(Object),
        instantSearchInstance: expect.any(Object),
      },
      `
Object {
  "createURL": [Function],
  "helper": Any<Object>,
  "instantSearchInstance": Any<Object>,
  "onHistoryChange": [Function],
  "state": Object {},
  "templatesConfig": Object {},
}
`
    );

    expect(renderArgs).toMatchInlineSnapshot(
      {
        helper: expect.any(Object),
        instantSearchInstance: expect.any(Object),
      },
      `
Object {
  "createURL": [Function],
  "helper": Any<Object>,
  "instantSearchInstance": Any<Object>,
  "results": Object {
    "_state": Object {},
  },
  "searchMetadata": Object {
    "isSearchStalled": false,
  },
  "state": Object {},
  "templatesConfig": Object {},
}
`
    );
  });

  it('returns a fake createURL to init & render', () => {
    // TODO: should take `routing` in account
    expect(initArgs.createURL()).toBe('#');
    expect(renderArgs.createURL()).toBe('#');
  });

  it('returns a fake onHistoryChange to init', () => {
    expect(initArgs.onHistoryChange()).toBe(undefined);
  });

  it('warns if the `search` has no helper', () => {
    // this happens if this method gets called without hydrate / findResultsState
    instantsearch.helper = null; // default value in InstantSearch
    global.console.warn = jest.fn();

    instantsearch.__forceRender(widget);

    expect(widget.init).toBeCalledTimes(1);
    expect(widget.render).toBeCalledTimes(1);
    expect(global.console.warn.mock.calls[0][0]).toMatchInlineSnapshot(
      `"You did not call \`instantsearch.findResultsState\`, which is required for ais-instant-search-ssr"`
    );
  });
});

describe('hydrate', () => {
  it('does not error if window does not have __ALGOLIA_STATE__', () => {
    global.console.warn = jest.fn();
    const { instantsearch } = createInstantSearch({
      searchClient: {},
      indexName: 'bla',
    });

    instantsearch.hydrate();

    expect(global.console.warn.mock.calls[0][0]).toMatchInlineSnapshot(
      `"You did not pass the result of \`findResultsState\` to \`hydrate\`, which is required"`
    );
  });

  it('reads state from argument', () => {
    const { instantsearch } = createInstantSearch({
      searchClient: {},
      indexName: 'bla',
    });

    instantsearch.hydrate(createSerializedState());

    expect(instantsearch.searchParameters).toEqual(
      expect.objectContaining({
        query: 'hi',
      })
    );
  });
});

describe('getState', () => {
  it('will throw an error if called before findResultsState', () => {
    const { instantsearch } = createInstantSearch({
      searchClient: {},
      indexName: 'test',
    });

    expect(instantsearch.getState).toThrowErrorMatchingInlineSnapshot(
      `"You called \`getState\` with an instance which has not searched yet, use \`findResultsState\`"`
    );
  });

  it('returns the last state', () => {
    const { instantsearch } = createInstantSearch({
      searchClient: {},
      indexName: 'test',
    });

    instantsearch.helper.lastResults = { dog: true };

    expect(instantsearch.getState()).toMatchInlineSnapshot(`
Object {
  "lastResults": Object {
    "dog": true,
  },
}
`);
  });
});

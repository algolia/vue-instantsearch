import instantsearch from 'instantsearch.js/es/index';
import algoliasearch from 'algoliasearch/lite';
import algoliaHelper from 'algoliasearch-helper';

export const createInstantSearch = () => {
  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );

  const search = instantsearch({
    searchClient,
    indexName: 'movies',
  });

  search.ssr = async params => {
    search.helper = algoliaHelper(searchClient, 'movies', 
params);

    const { content: lastResults } = await search.helper.searchOnce();

    // TODO: maybe use the life cycle version?
    search.helper.lastResults = lastResults;

    return {
      ais: {
        lastResults,
      },
    };
  };

  search.whateverTheMethodIs = widget => {
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

  search.injectOrHydrate = (results) => {
    search.searchParameters = results._state
    console.log(search.searchParameters)
  }

  return search;
};

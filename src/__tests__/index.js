import InstantSearch from 'vue-instantsearch';

test('Should register all components when installed', () => {
  const component = jest.fn();
  const Vue = { component };

  InstantSearch.install(Vue);

  expect(component).toBeCalledWith('ais-index', expect.any(Object));
  expect(component).toBeCalledWith('ais-input', expect.any(Object));
  expect(component).toBeCalledWith('ais-results', expect.any(Object));
  expect(component).toBeCalledWith('ais-stats', expect.any(Object));
  expect(component).toBeCalledWith('ais-pagination', expect.any(Object));
  expect(component).toBeCalledWith(
    'ais-results-per-page-selector',
    expect.any(Object)
  );
  expect(component).toBeCalledWith('ais-tree-menu', expect.any(Object));
  expect(component).toBeCalledWith('ais-sort-by-selector', expect.any(Object));
  expect(component).toBeCalledWith('ais-search-box', expect.any(Object));
  expect(component).toBeCalledWith('ais-clear', expect.any(Object));
  expect(component).toBeCalledWith('ais-rating', expect.any(Object));
  expect(component).toBeCalledWith('ais-no-results', expect.any(Object));
  expect(component).toBeCalledWith('ais-refinement-list', expect.any(Object));
  expect(component).toBeCalledWith('ais-price-range', expect.any(Object));
  expect(component).toBeCalledWith('ais-powered-by', expect.any(Object));
});

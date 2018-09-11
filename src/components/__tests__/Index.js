import { mount } from '@vue/test-utils';
import instantsearch from 'instantsearch.js/es';
import Index from '../Index.vue';

jest.mock('instantsearch.js/es', () => {
  const isPlainObject = require('lodash/isPlainObject');
  const start = jest.fn();
  const fakeInstantSearch = jest.fn(
    ({
      indexName,
      searchClient,
      routing, // eslint-disable-line no-unused-vars
      stalledSearchDelay, // eslint-disable-line no-unused-vars
      searchFunction, // eslint-disable-line no-unused-vars
    }) => {
      if (!searchClient && isPlainObject(searchClient)) {
        throw new Error('need searchClient to be a fn');
      }
      if (!indexName) {
        throw new Error('need indexName to be a string');
      }
      return {
        start,
        helper: fakeInstantSearch.__helper,
      };
    }
  );
  fakeInstantSearch.__startMock = start;
  fakeInstantSearch._stalledSearchDelay = 200;
  fakeInstantSearch.__helper = {
    search: jest.fn(),
    setClient: jest.fn(() => fakeInstantSearch.__helper),
    setIndex: jest.fn(() => fakeInstantSearch.__helper),
  };
  return fakeInstantSearch;
});

beforeEach(() => jest.clearAllMocks());

it('passes props to InstantSearch.js', () => {
  const searchClient = {};
  const searchFunction = helper => helper.search();
  mount(Index, {
    propsData: {
      searchClient,
      indexName: 'something',
      routing: true,
      stalledSearchDelay: 250,
      searchFunction,
    },
  });

  expect(instantsearch).toHaveBeenCalledWith({
    indexName: 'something',
    routing: true,
    searchClient,
    searchFunction,
    stalledSearchDelay: 250,
  });
});

it('calls `start` on the next tick', () => {
  mount(Index, {
    propsData: {
      searchClient: {},
      indexName: 'something',
    },
  });

  expect(instantsearch.__startMock).toHaveBeenCalledTimes(1);
});

it('provides an InstantSearch instance', () => {
  const wrapper = mount(Index, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
    },
  });

  expect(wrapper.vm._provided).toEqual({
    instantSearchInstance: expect.objectContaining({
      // it's really InstantSearch, since it has the same spy as our custom mock
      start: instantsearch.__startMock,
    }),
  });
});

it('renders correctly (empty)', () => {
  const wrapper = mount(Index, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

it('renders correctly (with slot used)', () => {
  const wrapper = mount(Index, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
    },
    slots: {
      default: '<div>Hi there, this is the main slot</div>',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

it('Allows a change in `index-name`', () => {
  const wrapper = mount(Index, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
    },
  });

  wrapper.setProps({
    indexName: 'doggie_bowl',
  });

  expect(instantsearch.__helper.setIndex).toHaveBeenCalledTimes(1);
  expect(instantsearch.__helper.setIndex).toHaveBeenCalledWith('doggie_bowl');
  expect(instantsearch.__helper.search).toHaveBeenCalledTimes(1);
});

it('Allows a change in `search-client`', () => {
  const wrapper = mount(Index, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
    },
  });

  const newClient = { cats: 'rule', dogs: 'drool' };

  wrapper.setProps({
    searchClient: newClient,
  });

  expect(instantsearch.__helper.setClient).toHaveBeenCalledTimes(1);
  expect(instantsearch.__helper.setClient).toHaveBeenCalledWith(newClient);
  expect(instantsearch.__helper.search).toHaveBeenCalledTimes(1);
});

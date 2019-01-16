import InstantSearchSsr from '../InstantSearchSsr';
import { mount } from '@vue/test-utils';
import instantsearch from 'instantsearch.js/es';

// TODO: find out why I can't mock this generally
jest.mock('instantsearch.js/es', () => {
  const isPlainObject = require('lodash/isPlainObject');
  const start = jest.fn();

  class RoutingManager {
    constructor(routing) {
      this._routing = routing;
    }
  }

  const fakeInstantSearch = jest.fn(
    ({
      indexName,
      searchClient,
      routing,
      stalledSearchDelay,
      searchFunction,
    }) => {
      if (!searchClient && !isPlainObject(searchClient)) {
        throw new Error('need searchClient to be a plain object');
      }
      if (!indexName) {
        throw new Error('need indexName to be a string');
      }
      return {
        _stalledSearchDelay: stalledSearchDelay,
        _searchFunction: searchFunction,
        routing: new RoutingManager(routing),
        helper: fakeInstantSearch.__helper,
        client: searchClient,
        start,
      };
    }
  );
  fakeInstantSearch.__startMock = start;
  fakeInstantSearch._stalledSearchDelay = 200;

  // note for the future: these tests would be better with a real helper instance
  fakeInstantSearch.__helper = {
    search: jest.fn(),
    setClient: jest.fn(() => fakeInstantSearch.__helper),
    setIndex: jest.fn(() => fakeInstantSearch.__helper),
  };
  return fakeInstantSearch;
});

it('requires an injected instantsearch instance ($_ais)', () => {
  expect(() => mount(InstantSearchSsr)).toThrowErrorMatchingInlineSnapshot(
    `"When using SSR, it is required to use the rootMixin"`
  );
});

it('renders correctly (empty)', () => {
  const wrapper = mount(InstantSearchSsr, {
    provide: () => ({
      $_ais: instantsearch({
        indexName: 'bla',
        searchClient: {},
      }),
    }),
  });

  expect(wrapper.html()).toMatchSnapshot();
});

it('renders correctly (with slot used)', () => {
  const wrapper = mount(InstantSearchSsr, {
    provide: () => ({
      $_ais: instantsearch({
        indexName: 'bla',
        searchClient: {},
      }),
    }),
    slots: {
      default: '<div>Hi there, this is the main slot</div>',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

// it('uses the provided instantsearch instance', () => {
//   const wrapper = mount(InstantSearchSsr, {
//     provide: {
//       $_ais() {
//         return {
//           client: {},
//         };
//       },
//     },
//   });
// });

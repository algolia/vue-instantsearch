/* eslint-disable import/no-commonjs */
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
module.exports = fakeInstantSearch;

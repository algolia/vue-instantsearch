/* eslint-disable import/no-commonjs */
const isPlainObject = require('lodash/isPlainObject');
const start = jest.fn();

class RoutingManager {
  constructor(routing) {
    this._routing = routing;
  }
}

class Helper {
  constructor() {
    this.search = jest.fn();
    this.setClient = jest.fn(() => this);
    this.setIndex = jest.fn(() => this);
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
      helper: new Helper(),
      client: searchClient,
      start,
    };
  }
);
fakeInstantSearch.__startMock = start;
fakeInstantSearch._stalledSearchDelay = 200;

module.exports = fakeInstantSearch;

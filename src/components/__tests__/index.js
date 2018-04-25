import Vue from 'vue';
import Index from '../Index.vue';

describe('Search Client', () => {
  describe('Properties', () => {
    it('throws if no `search()` method', () => {
      expect(() => {
        const Component = Vue.extend(Index);

        const vm = new Component({
          propsData: {
            indexName: 'indexName',
            searchClient: {},
          },
        });

        vm.$mount();
      }).toThrowErrorMatchingSnapshot();
    });
  });

  describe('API collision', () => {
    test('and indexName', () => {
      expect(() => {
        const Component = Vue.extend(Index);

        const vm = new Component({
          propsData: {
            indexName: 'indexName',
            searchClient: {
              search() {
                return Promise.resolve({ results: [{ hits: [] }] });
              },
            },
          },
        });

        vm.$mount();
      }).not.toThrow();
    });

    test('without indexName', () => {
      expect(() => {
        const Component = Vue.extend(Index);

        const vm = new Component({
          propsData: {
            searchClient: {
              search() {
                return Promise.resolve({ results: [{ hits: [] }] });
              },
            },
          },
        });

        vm.$mount();
      }).toThrowErrorMatchingSnapshot();
    });

    test('and appId', () => {
      expect(() => {
        const Component = Vue.extend(Index);

        const vm = new Component({
          propsData: {
            indexName: 'indexName',
            appId: 'appId',
            searchClient: {
              search() {
                return Promise.resolve({ results: [{ hits: [] }] });
              },
            },
          },
        });

        vm.$mount();
      }).toThrowErrorMatchingSnapshot();
    });

    test('and apiKey', () => {
      expect(() => {
        const Component = Vue.extend(Index);

        const vm = new Component({
          propsData: {
            indexName: 'indexName',
            apiKey: 'apiKey',
            searchClient: {
              search() {
                return Promise.resolve({ results: [{ hits: [] }] });
              },
            },
          },
        });

        vm.$mount();
      }).toThrowErrorMatchingSnapshot();
    });

    test('and searchStore', () => {
      expect(() => {
        const Component = Vue.extend(Index);

        const vm = new Component({
          propsData: {
            indexName: 'indexName',
            searchStore: {},
            searchClient: {
              search() {
                return Promise.resolve({ results: [{ hits: [] }] });
              },
            },
          },
        });

        vm.$mount();
      }).toThrowErrorMatchingSnapshot();
    });
  });
});

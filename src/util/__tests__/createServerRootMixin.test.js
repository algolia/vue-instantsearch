import Vue from 'vue';
import { mount } from '@vue/test-utils';
import _renderToString from 'vue-server-renderer/basic';
import Router from 'vue-router';
import Vuex from 'vuex';
import { createServerRootMixin } from '../createServerRootMixin';
import InstantSearchSsr from '../../components/InstantSearchSsr';
import Configure from '../../components/Configure';
import SearchBox from '../../components/SearchBox.vue';
import { createWidgetMixin } from '../../mixins/widget';
import { createFakeClient } from '../testutils/client';
import { createSerializedState } from '../testutils/helper';
import { SearchParameters, SearchResults } from 'algoliasearch-helper';

jest.unmock('instantsearch.js/es');

function renderToString(app) {
  return new Promise((resolve, reject) =>
    _renderToString(app, {}, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  );
}

const forceIsServerMixin = {
  beforeCreate() {
    Object.setPrototypeOf(
      this,
      new Proxy(Object.getPrototypeOf(this), {
        get: (target, key, receiver) =>
          key === '$isServer' ? true : Reflect.get(target, key, receiver),
      })
    );
  },
};

process.env.VUE_ENV = 'server';

describe('createServerRootMixin', () => {
  describe('creation', () => {
    it('requires searchClient', () => {
      expect(
        () =>
          new Vue({
            mixins: [
              createServerRootMixin({
                searchClient: undefined,
                indexName: 'lol',
              }),
            ],
          })
      ).toThrowErrorMatchingInlineSnapshot(`
"The \`searchClient\` option is required.

See documentation: https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/"
`);
    });

    it('requires indexName', () => {
      expect(
        () =>
          new Vue({
            mixins: [
              createServerRootMixin({
                searchClient: createFakeClient(),
                indexName: undefined,
              }),
            ],
          })
      ).toThrowErrorMatchingInlineSnapshot(`
"The \`indexName\` option is required.

See documentation: https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/"
`);
    });

    it('creates an instantsearch instance on "data"', () => {
      const app = new Vue({
        mixins: [
          createServerRootMixin({
            searchClient: createFakeClient(),
            indexName: 'lol',
          }),
        ],
      });

      expect(app.$data).toEqual({
        instantsearch: expect.objectContaining({
          start: expect.any(Function),
        }),
      });
    });

    it('provides the instantsearch instance ', () => {
      const App = {
        mixins: [
          createServerRootMixin({
            searchClient: createFakeClient(),
            indexName: 'myIndexName',
          }),
        ],
        render(h) {
          return h('div', {}, this.$slots.default);
        },
      };

      const Child = {
        mixins: [createWidgetMixin({ connector: true })],
        render(h) {
          return h('p', {}, this.instantSearchInstance.indexName);
        },
      };

      const wrapper = mount(App, {
        slots: {
          default: {
            render(h) {
              return h(InstantSearchSsr, [h(Child)]);
            },
          },
        },
      });

      expect(wrapper.html()).toMatchInlineSnapshot(`

<div>
  <div class="ais-InstantSearch ais-InstantSearch--ssr">
    <p>
      myIndexName
    </p>
  </div>
</div>

`);
    });
  });

  describe('findResultsState', () => {
    it('provides findResultsState', () => {
      const app = new Vue({
        mixins: [
          createServerRootMixin({
            searchClient: createFakeClient(),
            indexName: 'hello',
          }),
        ],
        render(h) {
          return h(InstantSearchSsr);
        },
      });

      expect(typeof app.$data.instantsearch.findResultsState).toBe('function');
    });

    it('detects child widgets', async () => {
      const searchClient = createFakeClient();

      const app = {
        mixins: [
          forceIsServerMixin,
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        render(h) {
          return h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]);
        },
        serverPrefetch() {
          return this.instantsearch.findResultsState(this);
        },
      };

      const wrapper = new Vue({
        mixins: [forceIsServerMixin],
        render(h) {
          return h(app);
        },
      });

      await renderToString(wrapper);

      const { instantsearch } = wrapper.$children[0].$data;

      expect(instantsearch.mainIndex.getWidgetState()).toMatchInlineSnapshot(`
Object {
  "hello": Object {
    "configure": Object {
      "hitsPerPage": 100,
    },
  },
}
`);

      expect(searchClient.search).toHaveBeenCalledTimes(1);
      expect(searchClient.search.mock.calls[0][0]).toMatchInlineSnapshot(`
Array [
  Object {
    "indexName": "hello",
    "params": Object {
      "facets": Array [],
      "hitsPerPage": 100,
      "query": "",
      "tagFilters": "",
    },
  },
]
`);
    });

    it('forwards router', async () => {
      const searchClient = createFakeClient();

      const router = new Router({});

      // there are two renders of App, each with an assertion
      expect.assertions(2);

      const App = Vue.component('App', {
        mixins: [
          forceIsServerMixin,
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        data() {
          expect(this.$router).toBe(router);
          return {};
        },
        render(h) {
          return h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]);
        },

        serverPrefetch() {
          return this.instantsearch.findResultsState(this);
        },
      });

      Vue.use(Router);

      const wrapper = new Vue({
        mixins: [forceIsServerMixin],
        router,
        render(h) {
          return h(App);
        },
      });

      await renderToString(wrapper);
    });

    it('forwards vuex', async () => {
      const searchClient = createFakeClient();

      Vue.use(Vuex);

      const store = new Vuex.Store();

      // there are two renders of App, each with an assertion
      expect.assertions(2);

      const App = Vue.component('App', {
        mixins: [
          forceIsServerMixin,
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        data() {
          expect(this.$store).toBe(store);
          return {};
        },
        render(h) {
          return h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]);
        },
        serverPrefetch() {
          return this.instantsearch.findResultsState(this);
        },
      });

      const wrapper = new Vue({
        mixins: [forceIsServerMixin],
        store,
        render(h) {
          return h(App);
        },
      });

      await renderToString(wrapper);
    });

    it('forwards props', async () => {
      const searchClient = createFakeClient();

      // there are two renders of App, each with an assertion
      expect.assertions(2);

      const someProp = { data: Math.random() };

      const App = Vue.component('App', {
        mixins: [
          forceIsServerMixin,
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        props: {
          someProp: {
            required: true,
            type: Object,
            validator(value) {
              expect(value).toBe(someProp);
              return value === someProp;
            },
          },
        },
        render(h) {
          return h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]);
        },
        serverPrefetch() {
          return this.instantsearch.findResultsState(this);
        },
      });

      const wrapper = new Vue({
        mixins: [forceIsServerMixin],
        render(h) {
          return h(App, { props: { someProp } });
        },
      });

      await renderToString(wrapper);
    });

    it('forwards slots', async done => {
      const searchClient = createFakeClient();

      expect.assertions(2);

      const App = Vue.component('App', {
        mixins: [
          forceIsServerMixin,
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        render(h) {
          return h(InstantSearchSsr, {}, this.$slots.default);
        },
        serverPrefetch() {
          return (
            this.instantsearch
              .findResultsState(this)
              .then(res => {
                expect(
                  this.instantsearch.mainIndex.getWidgets().map(w => w.$$type)
                ).toEqual(['ais.configure']);

                expect(res.hello.state.hitsPerPage).toBe(100);
              })
              // jest throws an error we need to catch, since stuck in the flow
              .catch(e => {
                done.fail(e);
              })
          );
        },
      });

      const wrapper = new Vue({
        mixins: [forceIsServerMixin],
        render(h) {
          return h(App, [
            h('template', { slot: 'default' }, [
              h(Configure, {
                attrs: {
                  hitsPerPage: 100,
                },
              }),
            ]),
          ]);
        },
      });

      await renderToString(wrapper);
      done();
    });

    // TODO: forwarding of scoped slots doesn't yet work.
    it.skip('forwards scoped slots', async done => {
      const searchClient = createFakeClient();

      expect.assertions(2);

      const App = {
        mixins: [
          forceIsServerMixin,
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        render: h =>
          h(InstantSearchSsr, {}, [this.$scopedSlots.default({ test: true })]),
        serverPrefetch() {
          return (
            this.instantsearch
              .findResultsState(this)
              .then(res => {
                expect(
                  this.instantsearch.mainIndex.getWidgets().map(w => w.$$type)
                ).toEqual(['ais.configure']);

                expect(res.hello._state.hitsPerPage).toBe(100);
              })
              // jest throws an error we need to catch, since stuck in the flow
              .catch(e => {
                done.fail(e);
              })
          );
        },
      };

      const wrapper = new Vue({
        mixins: [forceIsServerMixin],
        render: h =>
          h(App, {
            scopedSlots: {
              default({ test }) {
                if (test) {
                  return h(Configure, {
                    hitsPerPage: 100,
                  });
                }
                return null;
              },
            },
          }),
      });

      await renderToString(wrapper);
      done();
    });

    it('forwards root', async () => {
      const searchClient = createFakeClient();

      // there are two renders of App, each with an assertion
      expect.assertions(2);

      const App = Vue.component('App', {
        mixins: [
          forceIsServerMixin,
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        render(h) {
          expect(this.$root).toBe(wrapper);

          return h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]);
        },
        serverPrefetch() {
          return this.instantsearch.findResultsState(this);
        },
      });

      const wrapper = new Vue({
        mixins: [forceIsServerMixin],
        render(h) {
          return h(App);
        },
      });

      await renderToString(wrapper);
    });

    it('searches only once', async () => {
      const searchClient = createFakeClient();
      const app = {
        mixins: [
          forceIsServerMixin,
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        render: h =>
          /**
           * This code triggers this warning in Vue 3:
           * > Non-function value encountered for default slot. Prefer function slots for better performance.
           *
           * To fix it, replace the third argument
           * > [h(...), h(...)]
           * with
           * > { default: () => [h(...), h(...)] }
           *
           * but it's not important (and not compatible in vue2), we're leaving it as-is.
           */
          h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]),
        serverPrefetch() {
          return this.instantsearch.findResultsState(this);
        },
      };

      const wrapper = new Vue({
        mixins: [forceIsServerMixin],
        render: h => h(app),
      });

      await renderToString(wrapper);

      expect(searchClient.search).toHaveBeenCalledTimes(1);
      expect(searchClient.search.mock.calls[0][0]).toMatchInlineSnapshot(`
Array [
  Object {
    "indexName": "hello",
    "params": Object {
      "facets": Array [],
      "hitsPerPage": 100,
      "query": "",
      "tagFilters": "",
    },
  },
]
`);
    });
  });

  describe('hydrate', () => {
    it('sets _initialResults', () => {
      const serialized = createSerializedState();

      let instantsearch;
      const app = new Vue({
        mixins: [
          createServerRootMixin({
            searchClient: createFakeClient(),
            indexName: 'hello',
          }),
        ],
        render(h) {
          return h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]);
        },
        // in test, beforeCreated doesn't have $data yet, but IRL it does
        created() {
          instantsearch = this.instantsearch;
          this.instantsearch.hydrate({
            hello: serialized,
          });
        },
      });

      mount(app);

      expect(instantsearch._initialResults).toEqual(
        expect.objectContaining({
          hello: {
            state: expect.any(Object),
            results: expect.any(Object),
          },
        })
      );

      expect(instantsearch._initialResults.hello).toEqual(
        expect.objectContaining(serialized)
      );
    });

    it('inits the main index', () => {
      const serialized = createSerializedState();

      let instantsearch;

      const app = new Vue({
        mixins: [
          createServerRootMixin({
            searchClient: createFakeClient(),
            indexName: 'hello',
          }),
        ],
        render(h) {
          return h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]);
        },
        created() {
          instantsearch = this.instantsearch;
        },
      });

      mount(app);

      expect(instantsearch.mainIndex.getHelper()).toBe(null);

      instantsearch.hydrate({
        hello: serialized,
      });

      expect(instantsearch.mainIndex.getHelper().constructor.name).toBe(
        'AlgoliaSearchHelper'
      );
    });

    it('sets helper & mainHelper', () => {
      const serialized = createSerializedState();

      let instantsearch;

      const app = new Vue({
        mixins: [
          createServerRootMixin({
            searchClient: createFakeClient(),
            indexName: 'hello',
          }),
        ],
        render(h) {
          return h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]);
        },
        created() {
          instantsearch = this.instantsearch;
        },
      });

      mount(app);

      expect(instantsearch.helper).toBe(null);
      expect(instantsearch.mainHelper).toBe(null);

      instantsearch.hydrate({
        hello: serialized,
      });

      expect(instantsearch.helper.constructor.name).toBe('AlgoliaSearchHelper');
      expect(instantsearch.mainHelper.constructor.name).toBe(
        'AlgoliaSearchHelper'
      );
    });

    it('works when component is at root (and therefore has no $vnode)', async () => {
      const searchClient = createFakeClient();
      let mainIndex;

      const app = {
        render: h =>
          /**
           * This code triggers this warning in Vue 3:
           * > Non-function value encountered for default slot. Prefer function slots for better performance.
           *
           * To fix it, replace the third argument
           * > [h(...), h(...)]
           * with
           * > { default: () => [h(...), h(...)] }
           *
           * but it's not important (and not compatible in vue2), we're leaving it as-is.
           */
          h(InstantSearchSsr, {}, [
            h(Configure, {
              attrs: {
                hitsPerPage: 100,
              },
            }),
            h(SearchBox),
          ]),
      };

      const wrapper = new Vue({
        mixins: [
          forceIsServerMixin,
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        serverPrefetch() {
          return this.instantsearch.findResultsState(this);
        },
        created() {
          mainIndex = this.instantsearch.mainIndex;
        },
        render: h => h(app),
      });

      await renderToString(wrapper);

      expect(mainIndex.getWidgetState()).toMatchInlineSnapshot(`
Object {
  "hello": Object {
    "configure": Object {
      "hitsPerPage": 100,
    },
  },
}
`);

      expect(searchClient.search).toHaveBeenCalledTimes(1);
      expect(searchClient.search.mock.calls[0][0]).toMatchInlineSnapshot(`
Array [
  Object {
    "indexName": "hello",
    "params": Object {
      "facets": Array [],
      "hitsPerPage": 100,
      "query": "",
      "tagFilters": "",
    },
  },
]
`);
    });
  });

  describe('__forceRender', () => {
    it('calls render on widget', () => {
      const app = new Vue({
        mixins: [
          createServerRootMixin({
            searchClient: createFakeClient(),
            indexName: 'lol',
          }),
        ],
      });

      const widget = {
        init: jest.fn(),
        render: jest.fn(),
      };

      const instantSearchInstance = app.$data.instantsearch;

      instantSearchInstance.hydrate({
        lol: createSerializedState(),
      });

      instantSearchInstance.__forceRender(
        widget,
        instantSearchInstance.mainIndex
      );

      expect(widget.init).toHaveBeenCalledTimes(0);
      expect(widget.render).toHaveBeenCalledTimes(1);

      const renderArgs = widget.render.mock.calls[0][0];

      expect(renderArgs).toMatchInlineSnapshot(
        {
          helper: expect.anything(),
          results: expect.anything(),
          scopedResults: expect.arrayContaining([
            expect.objectContaining({
              helper: expect.anything(),
              indexId: expect.any(String),
              results: expect.anything(),
            }),
          ]),
          parent: expect.anything(),
          state: expect.anything(),
          instantSearchInstance: expect.anything(),
        },
        `
Object {
  "createURL": [Function],
  "helper": Anything,
  "instantSearchInstance": Anything,
  "parent": Anything,
  "results": Anything,
  "scopedResults": ArrayContaining [
    ObjectContaining {
      "helper": Anything,
      "indexId": Any<String>,
      "results": Anything,
    },
  ],
  "searchMetadata": Object {
    "isSearchStalled": false,
  },
  "state": Anything,
  "templatesConfig": Object {},
}
`
      );
    });

    it('uses the results passed to hydrate for rendering', () => {
      let instantSearchInstance;
      mount({
        mixins: [
          createServerRootMixin({
            searchClient: createFakeClient(),
            indexName: 'lol',
          }),
        ],
        created() {
          instantSearchInstance = this.instantsearch;
        },
        render() {},
      });

      const widget = {
        init: jest.fn(),
        render: jest.fn(),
      };

      const resultsState = createSerializedState();
      const state = new SearchParameters(resultsState.state);
      const results = new SearchResults(state, resultsState.results);

      instantSearchInstance.hydrate({
        lol: resultsState,
      });

      instantSearchInstance.__forceRender(
        widget,
        instantSearchInstance.mainIndex
      );

      expect(widget.init).toHaveBeenCalledTimes(0);
      expect(widget.render).toHaveBeenCalledTimes(1);

      const renderArgs = widget.render.mock.calls[0][0];

      expect(renderArgs).toEqual(
        expect.objectContaining({
          state,
          results,
          scopedResults: [
            expect.objectContaining({
              indexId: 'lol',
              results,
            }),
          ],
        })
      );
    });

    describe('createURL', () => {
      it('returns # if instantsearch has no routing', () => {
        const app = new Vue({
          mixins: [
            createServerRootMixin({
              searchClient: createFakeClient(),
              indexName: 'lol',
            }),
          ],
        });

        const widget = {
          init: jest.fn(),
          render: jest.fn(),
        };

        const instantSearchInstance = app.$data.instantsearch;

        instantSearchInstance.hydrate({
          lol: createSerializedState(),
        });

        instantSearchInstance.__forceRender(
          widget,
          instantSearchInstance.mainIndex
        );

        const renderArgs = widget.render.mock.calls[0][0];

        expect(renderArgs.createURL()).toBe('#');
      });

      it('allows for widgets without getWidgetState', () => {
        const app = new Vue({
          mixins: [
            createServerRootMixin({
              searchClient: createFakeClient(),
              indexName: 'lol',
            }),
          ],
        });

        const widget = {
          init: jest.fn(),
          render: jest.fn(),
          getWidgetState(uiState) {
            return uiState;
          },
        };

        const widgetWithoutGetWidgetState = {
          init: jest.fn(),
          render: jest.fn(),
        };

        const instantSearchInstance = app.$data.instantsearch;

        instantSearchInstance.hydrate({
          lol: createSerializedState(),
        });

        instantSearchInstance.addWidgets([widget, widgetWithoutGetWidgetState]);

        instantSearchInstance.__forceRender(
          widget,
          instantSearchInstance.mainIndex
        );

        const renderArgs = widget.render.mock.calls[0][0];

        expect(renderArgs.createURL()).toBe('#');
      });
    });
  });
});

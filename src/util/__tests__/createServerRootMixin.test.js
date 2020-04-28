import Vue from 'vue';
import { mount } from '@vue/test-utils';
import _renderToString from 'vue-server-renderer/basic';
import { createServerRootMixin } from '../createServerRootMixin';
import InstantSearchSsr from '../../components/InstantSearchSsr';
import Configure from '../../components/Configure';
import SearchBox from '../../components/SearchBox.vue';
import { createWidgetMixin } from '../../mixins/widget';
import { createFakeClient } from '../testutils/client';
import { createSerializedState } from '../testutils/helper';

jest.unmock('instantsearch.js/es');

function renderToString(app) {
  return new Promise((resolve, reject) =>
    _renderToString(app, {}, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  );
}

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
      ).toThrowErrorMatchingInlineSnapshot(
        `"createServerRootMixin requires the \`searchClient\` and \`indexName\` arguments to be passed"`
      );
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
      ).toThrowErrorMatchingInlineSnapshot(
        `"createServerRootMixin requires the \`searchClient\` and \`indexName\` arguments to be passed"`
      );
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

  it('augments instantsearch with __isServerRendering', () => {
    const app = new Vue({
      mixins: [
        createServerRootMixin({
          searchClient: createFakeClient(),
          indexName: 'xxx',
        }),
      ],
    });

    expect(app.$data.instantsearch.__isServerRendering).toBe(app.$isServer);
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

    it.only('detects child widgets', async () => {
      const searchClient = createFakeClient();

      const app = {
        beforeCreate() {
          Object.setPrototypeOf(
            this,
            new Proxy(Object.getPrototypeOf(this), {
              get: (target, key, receiver) =>
                key === '$isServer' ? true : Reflect.get(target, key, receiver),
            })
          );
        },

        mixins: [
          createServerRootMixin({
            searchClient,
            indexName: 'hello',
          }),
        ],
        render(h) {
          return h(InstantSearchSsr, {}, [
            h(Configure, {
              hitsPerPage: 100,
            }),
            h(SearchBox),
          ]);
        },
        serverPrefetch() {
          return this.instantsearch.findResultsState(this);
        },
      };

      const wrapper = new Vue({
        render(h) {
          return h(app);
        },
      });

      await renderToString(wrapper);

      const { instantsearch } = wrapper.$children[0].$data;

      // TODO: it's wrong, should have configure etc. there...
      expect(instantsearch.mainIndex.getWidgetState()).toMatchInlineSnapshot(`
Object {
  "hello": Object {},
}
`);

      // TODO: because of that, it's also not right here
      expect(searchClient.search.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    Array [
      Object {
        "indexName": "hello",
        "params": Object {
          "facets": Array [],
          "tagFilters": "",
        },
      },
    ],
  ],
]
`);
    });
  });

  describe('hydrate', () => {
    // TODO
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
          helper: expect.any(Object),
          results: expect.any(Object),
          state: expect.any(Object),
          instantSearchInstance: expect.any(Object),
        },
        `
Object {
  "createURL": [Function],
  "helper": Any<Object>,
  "instantSearchInstance": Any<Object>,
  "results": Any<Object>,
  "searchMetadata": Object {
    "isSearchStalled": false,
  },
  "state": Any<Object>,
  "templatesConfig": Object {},
}
`
      );
    });

    it('has a fake createURL', () => {
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
  });
});

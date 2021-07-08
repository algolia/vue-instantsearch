import { isVue3, version as vueVersion } from '../../util/vue';
import { mount, nextTick } from '../../../test/utils';
import instantsearch from 'instantsearch.js/es';
import InstantSearch from '../InstantSearch';
import { version } from '../../../package.json';
import { warn } from '../../util/warn';

jest.mock('../../util/warn');

beforeEach(() => {
  jest.clearAllMocks();
});

it('passes props to InstantSearch.js', () => {
  const searchClient = {};
  const insightsClient = jest.fn();
  const searchFunction = helper => helper.search();

  mount(InstantSearch, {
    propsData: {
      searchClient,
      insightsClient,
      indexName: 'something',
      routing: {
        router: {},
        stateMapping: {},
      },
      stalledSearchDelay: 250,
      searchFunction,
    },
    slots: {
      default: '',
    },
  });

  expect(instantsearch).toHaveBeenCalledWith({
    indexName: 'something',
    routing: {
      router: {},
      stateMapping: {},
    },
    searchClient,
    insightsClient,
    searchFunction,
    stalledSearchDelay: 250,
  });
});

it('throws on usage of appId or apiKey', () => {
  global.console.error = jest.fn();
  global.console.warn = jest.fn();

  mount(InstantSearch, {
    propsData: {
      searchClient: {},
      apiKey: 'bla',
      appId: 'blabla',
      indexName: 'something',
    },
    slots: {
      default: '',
    },
  });

  expect(warn)
    .toHaveBeenCalledWith(`Vue InstantSearch: You used the prop api-key or app-id.
These have been replaced by search-client.

See more info here: https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-search-client`);

  if (isVue3) {
    expect(global.console.warn.mock.calls[0][0]).toMatchInlineSnapshot(
      `"[Vue warn]: Invalid prop: custom validator check failed for prop \\"apiKey\\"."`
    );

    expect(global.console.warn.mock.calls[1][0]).toMatchInlineSnapshot(
      `"[Vue warn]: Invalid prop: custom validator check failed for prop \\"appId\\"."`
    );
  } else {
    expect(global.console.error.mock.calls[0][0]).toMatchInlineSnapshot(`
"[Vue warn]: Invalid prop: custom validator check failed for prop \\"apiKey\\".

found in

---> <AisInstantSearch>
       <Root>"
`);

    expect(global.console.error.mock.calls[1][0]).toMatchInlineSnapshot(`
"[Vue warn]: Invalid prop: custom validator check failed for prop \\"appId\\".

found in

---> <AisInstantSearch>
       <Root>"
`);
  }
});

it('calls `start` on the next tick', async () => {
  const wrapper = mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'something',
    },
    slots: {
      default: '',
    },
  });

  await nextTick();
  expect(wrapper.vm.instantSearchInstance.start).toHaveBeenCalledTimes(1);
});

it('renders correctly (empty)', () => {
  const wrapper = mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
    },
    slots: {
      default: '',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

it('renders correctly (with slot used)', () => {
  const wrapper = mount(InstantSearch, {
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

it('Allows a change in `index-name`', async () => {
  const wrapper = mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
    },
    slots: {
      default: '',
    },
  });

  await wrapper.setProps({
    indexName: 'doggie_bowl',
  });

  const helper = wrapper.vm.instantSearchInstance.helper;

  expect(helper.setIndex).toHaveBeenCalledTimes(1);
  expect(helper.setIndex).toHaveBeenCalledWith('doggie_bowl');
  expect(helper.search).toHaveBeenCalledTimes(1);
});

it('Allows a change in `search-client`', async () => {
  const wrapper = mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
    },
    slots: {
      default: '',
    },
  });

  const newClient = { cats: 'rule', dogs: 'drool' };

  await wrapper.setProps({
    searchClient: newClient,
  });

  const helper = wrapper.vm.instantSearchInstance.helper;

  expect(helper.setClient).toHaveBeenCalledTimes(1);
  expect(helper.setClient).toHaveBeenCalledWith(newClient);
  expect(helper.search).toHaveBeenCalledTimes(1);
});

it('Allows a change in `search-function`', async () => {
  const oldValue = () => {};
  const newValue = () => {};

  const wrapper = mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
      searchFunction: oldValue,
    },
    slots: {
      default: '',
    },
  });

  expect(wrapper.vm.instantSearchInstance._searchFunction).toEqual(oldValue);

  await wrapper.setProps({
    searchFunction: newValue,
  });

  expect(wrapper.vm.instantSearchInstance._searchFunction).toEqual(newValue);
});

it('Allows a change in `stalled-search-delay`', async () => {
  const wrapper = mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
      searchFunction: () => {},
      stalledSearchDelay: 200,
    },
    slots: {
      default: '',
    },
  });

  expect(wrapper.vm.instantSearchInstance._stalledSearchDelay).toEqual(200);

  await wrapper.setProps({
    stalledSearchDelay: 50,
  });

  expect(wrapper.vm.instantSearchInstance._stalledSearchDelay).toEqual(50);
});

it('does not allow `routing` to be a boolean', () => {
  global.console.error = jest.fn();
  global.console.warn = jest.fn();
  mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
      routing: true,
    },
    slots: {
      default: '',
    },
  });

  if (isVue3) {
    expect(global.console.warn.mock.calls[0][0]).toMatchInlineSnapshot(
      `"[Vue warn]: Invalid prop: custom validator check failed for prop \\"routing\\"."`
    );
  } else {
    expect(global.console.error.mock.calls[0][0]).toMatchInlineSnapshot(`
"[Vue warn]: Invalid prop: custom validator check failed for prop \\"routing\\".

found in

---> <AisInstantSearch>
       <Root>"
`);
  }

  expect(warn)
    .toHaveBeenCalledWith(`The \`routing\` option expects an object with \`router\` and/or \`stateMapping\`.

See https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-routing`);
});

it('warns when `routing` does not have `router` or `stateMapping`', () => {
  mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'indexName',
      routing: {},
    },
    slots: {
      default: '',
    },
  });

  expect(warn)
    .toHaveBeenCalledWith(`The \`routing\` option expects an object with \`router\` and/or \`stateMapping\`.

See https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-routing`);
});

it('does not warn when `routing` have either `router` or `stateMapping`', () => {
  mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'indexName',
      routing: { router: {} },
    },
    slots: {
      default: '',
    },
  });
  mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'indexName',
      routing: { stateMapping: {} },
    },
    slots: {
      default: '',
    },
  });

  expect(warn).toHaveBeenCalledTimes(0);
});

it('Does not allow a change in `routing`', () => {
  const wrapper = mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'bla',
    },
    slots: {
      default: '',
    },
  });

  expect(
    wrapper.setProps({
      routing: false,
    })
  ).rejects.toMatchInlineSnapshot(`
[Error: routing configuration can not be changed dynamically at this point.

Please open a new issue: https://github.com/algolia/vue-instantsearch/issues/new?template=feature.md]
`);
});

it('will call client.addAlgoliaAgent if present', () => {
  const client = { addAlgoliaAgent: jest.fn() };

  mount(InstantSearch, {
    propsData: {
      searchClient: client,
      indexName: 'bla',
    },
    slots: { default: '' },
  });

  expect(client.addAlgoliaAgent).toHaveBeenCalledTimes(2);
  expect(client.addAlgoliaAgent).toHaveBeenCalledWith(`Vue (${vueVersion})`);
  expect(client.addAlgoliaAgent).toHaveBeenCalledWith(
    `Vue InstantSearch (${version})`
  );
});

it('will not call client.addAlgoliaAgent if not function (so nothing to assert)', () => {
  expect(() =>
    mount(InstantSearch, {
      propsData: {
        searchClient: { addAlgoliaAgent: true },
        indexName: 'bla',
      },
      slots: { default: '' },
    })
  ).not.toThrow();
});

it('disposes the instantsearch instance on unmount', async () => {
  const wrapper = mount(InstantSearch, {
    propsData: {
      searchClient: {},
      indexName: 'something',
    },
    slots: { default: '' },
  });

  await nextTick();

  expect(wrapper.vm.instantSearchInstance.started).toBe(true);

  wrapper.destroy();

  expect(wrapper.vm.instantSearchInstance.started).toBe(false);
  expect(wrapper.vm.instantSearchInstance.dispose).toHaveBeenCalledTimes(1);
});

it('provides the instantsearch instance', done => {
  let instantSearchInstance;

  const ParentComponent = {
    ...InstantSearch,
    created() {
      instantSearchInstance = this.instantSearchInstance;
    },
  };

  const ChildComponent = {
    inject: ['$_ais_instantSearchInstance'],
    mounted() {
      this.$nextTick(() => {
        expect(typeof this.$_ais_instantSearchInstance).toBe('object');
        expect(this.$_ais_instantSearchInstance).toBe(instantSearchInstance);
        done();
      });
    },
    render() {
      return null;
    },
  };

  // https://github.com/vuejs/vue-test-utils-next/issues/727
  mount({
    components: { ParentComponent, ChildComponent },
    data() {
      return {
        props: {
          searchClient: {},
          indexName: 'something',
        },
      };
    },
    template: `
      <ParentComponent v-bind="props">
        <ChildComponent />
      </ParentComponent>
    `,
  });
});

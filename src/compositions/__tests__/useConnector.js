jest.unmock('instantsearch.js/es');
import InstantSearch from '../../components/InstantSearch';
import Index from '../../components/Index';
import { createFakeClient } from '../../util/testutils/client';
import { isVue3, isVue2, ref } from '../../util/vue-compat';
import { mount, wait } from '../../../test/utils';
import { useConnector } from '../useConnector';

if (isVue2) {
  it('does nothing in Vue 2', () => {});
} else if (isVue3) {
  describe('on root index', () => {
    const setup = ({ ChildComponent }) => {
      const wrapper = mount({
        components: { InstantSearch, ChildComponent },
        data() {
          return {
            props: { searchClient: createFakeClient(), indexName: 'something' },
          };
        },
        template: `
            <InstantSearch v-bind="props">
              <ChildComponent />
            </InstantSearch>
          `,
      });

      const getWidgets = () =>
        wrapper
          .findComponent(InstantSearch)
          .vm.instantSearchInstance.mainIndex.getWidgets();

      return { wrapper, getWidgets };
    };

    it('adds a widget on create', () => {
      const widget = { render: () => {} };
      const factory = jest.fn(() => widget);
      const connector = jest.fn(() => factory);

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, {}, {});
          return { state };
        },
        template: '<div></div>',
      };

      const { getWidgets } = setup({ ChildComponent });

      const widgets = getWidgets();

      expect(widgets.length).toBe(1);
      expect(widgets[0]).toEqual(widget);
    });

    it('removes a widget on destroy', () => {
      const widget = { render: () => {}, dispose: () => {} };
      const factory = jest.fn(() => widget);
      const connector = jest.fn(() => factory);

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, {}, {});
          return { state };
        },
        template: '<div></div>',
      };

      const { wrapper, getWidgets } = setup({ ChildComponent });

      expect(getWidgets().length).toBe(1);

      wrapper.destroy();

      expect(getWidgets().length).toBe(0);
    });

    it('returns correct state', async () => {
      const connector = jest.fn(renderFn => widgetParams => ({
        render() {
          renderFn({ widgetParams });
        },
        dispose() {},
      }));

      const widgetParams = {
        attribute: 'brand',
      };

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, widgetParams, null);
          return { state };
        },
        template: '<div>{{ state && state.widgetParams.attribute }}</div>',
      };

      const { wrapper } = setup({ ChildComponent });

      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
          brand
        </div>
      `);
    });

    it('updates widget on widget params change', async () => {
      const connector = jest.fn(renderFn => widgetParams => ({
        render() {
          renderFn({ widgetParams });
        },
        dispose() {},
      }));

      const widgetParams = ref({
        attribute: 'brand',
      });

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, widgetParams, null);
          return { state };
        },
        template: '<div>{{ state && state.widgetParams.attribute }}</div>',
      };

      const { wrapper } = setup({ ChildComponent });

      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
          brand
        </div>
      `);

      widgetParams.value = { attribute: 'color' };
      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
          color
        </div>
      `);
    });
  });

  describe('on child index', () => {
    const setup = ({ ChildComponent }) => {
      const wrapper = mount({
        components: { InstantSearch, Index, ChildComponent },
        data() {
          return {
            props: { searchClient: createFakeClient(), indexName: 'something' },
            propsForIndex: { indexName: 'else' },
          };
        },
        template: `
            <InstantSearch v-bind="props">
              <Index v-bind="propsForIndex">
                <ChildComponent />
              </Index>
            </InstantSearch>
          `,
      });
      const getWidgets = () =>
        wrapper.findComponent(Index).vm.widget.getWidgets();

      return { wrapper, getWidgets };
    };

    it('adds a widget on create', () => {
      const widget = { render: () => {} };
      const factory = jest.fn(() => widget);
      const connector = jest.fn(() => factory);

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, {}, {});
          return { state };
        },
        template: '<div></div>',
      };

      const { getWidgets } = setup({ ChildComponent });

      const widgets = getWidgets();
      expect(widgets.length).toBe(1);
      expect(widgets[0]).toEqual(widget);
    });

    it('removes a widget on destroy', () => {
      const widget = { render: () => {}, dispose: () => {} };
      const factory = jest.fn(() => widget);
      const connector = jest.fn(() => factory);

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, {}, {});
          return { state };
        },
        template: '<div></div>',
      };

      const { wrapper, getWidgets } = setup({ ChildComponent });

      expect(getWidgets().length).toBe(1);

      wrapper.destroy();

      expect(getWidgets().length).toBe(0);
    });

    it('returns correct state', async () => {
      const connector = jest.fn(renderFn => widgetParams => ({
        render() {
          renderFn({ widgetParams });
        },
        dispose() {},
      }));

      const widgetParams = {
        attribute: 'brand',
      };

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, widgetParams, null);
          return { state };
        },
        template: '<div>{{ state && state.widgetParams.attribute }}</div>',
      };

      const { wrapper } = setup({ ChildComponent });

      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
          brand
        </div>
      `);
    });

    it('updates widget on widget params change', async () => {
      const connector = jest.fn(renderFn => widgetParams => ({
        render() {
          renderFn({ widgetParams });
        },
        dispose() {},
      }));

      const widgetParams = ref({
        attribute: 'brand',
      });

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, widgetParams, null);
          return { state };
        },
        template: '<div>{{ state && state.widgetParams.attribute }}</div>',
      };

      const { wrapper } = setup({ ChildComponent });

      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
          brand
        </div>
      `);

      widgetParams.value = { attribute: 'color' };
      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
          color
        </div>
      `);
    });
  });
}

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
          const state = useConnector(connector, {});
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
          const state = useConnector(connector, {});
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
      const connector = jest.fn(renderFn => props => ({
        render() {
          renderFn({ props });
        },
        dispose() {},
      }));

      const props = {
        attribute: 'brand',
      };

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, props);
          return { state };
        },
        template: '<div>{{ state && state.props.attribute }}</div>',
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

    it('removes widgetParams', async () => {
      const connector = jest.fn(renderFn => props => ({
        render() {
          renderFn({ props, widgetParams: props });
        },
        dispose() {},
      }));

      const props = {
        attribute: 'brand',
      };

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, props);
          return { state };
        },
        template:
          '<div>{{ state && state.widgetParams && state.widgetParams.attribute }}</div>',
      };

      const { wrapper } = setup({ ChildComponent });

      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
        </div>
      `);
    });

    it('updates widget on props change', async () => {
      const connector = jest.fn(renderFn => props => ({
        render() {
          renderFn({ props });
        },
        dispose() {},
      }));

      const props = ref({
        attribute: 'brand',
      });

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, props);
          return { state };
        },
        template: '<div>{{ state && state.props.attribute }}</div>',
      };

      const { wrapper } = setup({ ChildComponent });

      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
          brand
        </div>
      `);

      props.value = { attribute: 'color' };
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
          const state = useConnector(connector, {});
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
          const state = useConnector(connector, {});
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
      const connector = jest.fn(renderFn => props => ({
        render() {
          renderFn({ props });
        },
        dispose() {},
      }));

      const props = {
        attribute: 'brand',
      };

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, props);
          return { state };
        },
        template: '<div>{{ state && state.props.attribute }}</div>',
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

    it('removes widgetParams', async () => {
      const connector = jest.fn(renderFn => props => ({
        render() {
          renderFn({ props, widgetParams: props });
        },
        dispose() {},
      }));

      const props = {
        attribute: 'brand',
      };

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, props);
          return { state };
        },
        template:
          '<div>{{ state && state.widgetParams && state.widgetParams.attribute }}</div>',
      };

      const { wrapper } = setup({ ChildComponent });

      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
        </div>
      `);
    });

    it('updates widget on props change', async () => {
      const connector = jest.fn(renderFn => props => ({
        render() {
          renderFn({ props });
        },
        dispose() {},
      }));

      const props = ref({
        attribute: 'brand',
      });

      const ChildComponent = {
        setup() {
          const state = useConnector(connector, props);
          return { state };
        },
        template: '<div>{{ state && state.props.attribute }}</div>',
      };

      const { wrapper } = setup({ ChildComponent });

      await wait(0);
      expect(wrapper.findComponent(ChildComponent).html())
        .toMatchInlineSnapshot(`
        <div>
          brand
        </div>
      `);

      props.value = { attribute: 'color' };
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

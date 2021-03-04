import { createLocalVue, mount } from '@vue/test-utils';
import DynamicWidgets from '../DynamicWidgets';
import { __setState } from '../../mixins/widget';
import { plugin } from '../../plugin';
jest.mock('../../mixins/widget');

it('renders all children without state', () => {
  const localVue = createLocalVue();

  localVue.use(plugin);

  __setState(null);

  const wrapper = mount(DynamicWidgets, {
    localVue,
    propsData: {
      transformItems: items => items,
    },
    slots: {
      default: `
      <ais-refinement-list attribute="test1"/>
      <ais-refinement-list attribute="test2"/>
      <ais-panel>
        <ais-hierarchical-menu :attributes="['test3', 'test3']" />
      </ais-panel>
      `,
    },
  });

  // the inner widgets don't render anything because state is falsy, but they are mounted
  expect(wrapper.html()).toMatchInlineSnapshot(`

<div hidden="hidden"
     class="ais-DynamicWidgets"
>
  <div class="ais-DynamicWidgets-widget">
  </div>
  <div class="ais-DynamicWidgets-widget">
  </div>
  <div class="ais-DynamicWidgets-widget">
    <div class="ais-Panel">
      <div class="ais-Panel-body">
      </div>
    </div>
  </div>
</div>

`);
});

it('renders nothing without children', () => {
  __setState({
    attributesToRender: [],
  });

  const wrapper = mount(DynamicWidgets, {
    propsData: {
      transformItems: items => items,
    },
  });
  expect(wrapper.html()).toMatchInlineSnapshot(`

<div class="ais-DynamicWidgets">
</div>

`);
});

it('renders nothing with empty items', () => {
  const localVue = createLocalVue();

  localVue.use(plugin);

  __setState({
    attributesToRender: [],
    items: [],
  });

  const wrapper = mount(DynamicWidgets, {
    localVue,
    propsData: {
      transformItems: items => items,
    },
    slots: {
      default: `<ais-refinement-list attribute="test1"/>`,
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`

<div class="ais-DynamicWidgets">
</div>

`);
});

it('renders attributesToRender 1', () => {
  const localVue = createLocalVue();

  localVue.use(plugin);

  __setState({
    attributesToRender: ['test1'],
    items: [],
  });

  localVue.component('test-component', {
    props: { attribute: { type: String } },
    render(h) {
      return h('div', {}, this.attribute);
    },
  });

  const wrapper = mount(DynamicWidgets, {
    localVue,
    propsData: {
      transformItems: items => items,
    },
    slots: {
      default: `
        <test-component attribute="test1" />
        <ais-refinement-list attribute="test2" />
      `,
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`

<div class="ais-DynamicWidgets">
  <div class="ais-DynamicWidgets-widget">
    <div>
      test1
    </div>
  </div>
</div>

`);
});

it('renders attributesToRender 2', () => {
  const localVue = createLocalVue();

  localVue.use(plugin);

  __setState({
    attributesToRender: ['test2'],
    items: [],
  });

  localVue.component('test-component', {
    props: { attribute: { type: String } },
    render(h) {
      return h('div', {}, this.attribute);
    },
  });

  const wrapper = mount(DynamicWidgets, {
    localVue,
    propsData: {
      transformItems: items => items,
    },
    slots: {
      default: `
        <test-component attribute="test1" />
        <ais-refinement-list attribute="test2" />
      `,
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`

<div class="ais-DynamicWidgets">
  <div class="ais-DynamicWidgets-widget">
  </div>
</div>

`);
});

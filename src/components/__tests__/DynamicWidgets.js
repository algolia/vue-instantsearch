import { mount, nextTick } from '../../../test/utils';
import DynamicWidgets from '../DynamicWidgets';
import { __setState } from '../../mixins/widget';
import { AisPanel } from '../../widgets';
jest.mock('../../mixins/widget');

const MockRefinementList = {
  props: { attribute: { type: String } },
  template: `
    <div widget-name="ais-refinement-list">{{ attribute }}</div>
  `,
};

const MockMenu = {
  props: { attribute: { type: String } },
  template: `
    <div widget-name="ais-menu">{{ attribute }}</div>
  `,
};

const MockHierarchicalMenu = {
  props: { attributes: { type: Array } },
  template: `
    <div widget-name="ais-hierarchical-menu">{{ attributes }}</div>
  `,
};

it('renders all children without state', () => {
  __setState(null);

  const wrapper = mount({
    data() {
      return { props: { transformItems: items => items } };
    },
    template: `
      <DynamicWidgets v-bind="props">
        <MockRefinementList attribute="test1"/>
        <MockMenu attribute="test2"/>
        <AisPanel>
          <MockHierarchicalMenu :attributes="['test3', 'test4']" />
        </AisPanel>
      </DynamicWidgets>
      `,
    components: {
      DynamicWidgets,
      MockRefinementList,
      MockMenu,
      MockHierarchicalMenu,
      AisPanel,
    },
  });

  expect(wrapper.classes()).toContain('ais-DynamicWidgets');
  expect(wrapper).toBeHidden();
  expect(wrapper.element.innerHTML).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets-widget">
      <div widget-name="ais-refinement-list">
        test1
      </div>
    </div>
    <div class="ais-DynamicWidgets-widget">
      <div widget-name="ais-menu">
        test2
      </div>
    </div>
    <div class="ais-DynamicWidgets-widget">
      <div class="ais-Panel">
        <div class="ais-Panel-body">
          <div widget-name="ais-hierarchical-menu">
            [
      "test3",
      "test4"
    ]
          </div>
        </div>
      </div>
    </div>
  `);
});

it('renders nothing without children', () => {
  __setState({
    attributesToRender: ['something-that-does-not-show'],
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

it('renders nothing with empty attributesToRender', () => {
  __setState({
    attributesToRender: [],
  });

  const wrapper = mount(DynamicWidgets, {
    template: `
      <DynamicWidgets :transformItems="items => items">
        <MockRefinementList attribute="test1" />
      </DynamicWidgets>
    `,
    components: {
      DynamicWidgets,
      MockRefinementList,
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets">
    </div>
  `);
});

it('renders attributesToRender (menu)', () => {
  __setState({
    attributesToRender: ['test1'],
  });

  const wrapper = mount({
    template: `
      <DynamicWidgets :transformItems="items => items">
        <MockMenu attribute="test1" />
        <MockRefinementList attribute="test2" />
      </DynamicWidgets>
    `,
    components: {
      DynamicWidgets,
      MockRefinementList,
      MockMenu,
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets">
      <div class="ais-DynamicWidgets-widget">
        <div widget-name="ais-menu">
          test1
        </div>
      </div>
    </div>
  `);
});

it('renders attributesToRender (refinement list)', () => {
  __setState({
    attributesToRender: ['test2'],
  });

  const wrapper = mount({
    template: `
      <DynamicWidgets :transformItems="items => items">
        <MockMenu attribute="test1" />
        <MockRefinementList attribute="test2" />
      </DynamicWidgets>
    `,
    components: {
      DynamicWidgets,
      MockRefinementList,
      MockMenu,
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets">
      <div class="ais-DynamicWidgets-widget">
        <div widget-name="ais-refinement-list">
          test2
        </div>
      </div>
    </div>
  `);
});

it('renders attributesToRender (panel)', () => {
  __setState({
    attributesToRender: ['test2'],
  });

  const wrapper = mount({
    template: `
      <DynamicWidgets :transformItems="items => items">
        <MockMenu attribute="test1" />
        <AisPanel>
          <MockRefinementList attribute="test2" />
        </AisPanel>
      </DynamicWidgets>
    `,
    components: {
      DynamicWidgets,
      MockRefinementList,
      MockMenu,
      AisPanel,
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets">
      <div class="ais-DynamicWidgets-widget">
        <div class="ais-Panel">
          <div class="ais-Panel-body">
            <div widget-name="ais-refinement-list">
              test2
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

it('renders attributesToRender (hierarchical menu)', () => {
  __setState({
    attributesToRender: ['test1'],
  });

  const wrapper = mount({
    template: `
      <DynamicWidgets :transformItems="items => items">
        <MockHierarchicalMenu :attributes="['test1','test2']" />
        <MockMenu attribute="test3" />
        <AisPanel>
          <MockRefinementList attribute="test4" />
        </AisPanel>
      </DynamicWidgets>
    `,
    components: {
      DynamicWidgets,
      MockRefinementList,
      MockMenu,
      MockHierarchicalMenu,
      AisPanel,
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets">
      <div class="ais-DynamicWidgets-widget">
        <div widget-name="ais-hierarchical-menu">
          [
          "test1",
          "test2"
          ]
        </div>
      </div>
    </div>
  `);
});

it('updates DOM when attributesToRender changes', async () => {
  let attributesToRender = ['test1'];

  __setState({
    get attributesToRender() {
      return attributesToRender;
    },
  });

  const wrapper = mount({
    template: `
      <DynamicWidgets :transformItems="items => items">
        <MockHierarchicalMenu :attributes="['test1','test2']" />
        <MockMenu attribute="test3" />
        <AisPanel>
          <MockRefinementList attribute="test4" />
        </AisPanel>
      </DynamicWidgets>
    `,
    components: {
      DynamicWidgets,
      MockRefinementList,
      MockMenu,
      MockHierarchicalMenu,
      AisPanel,
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets">
      <div class="ais-DynamicWidgets-widget">
        <div widget-name="ais-hierarchical-menu">
          [
          "test1",
          "test2"
          ]
        </div>
      </div>
    </div>
  `);

  attributesToRender = ['test3'];
  wrapper.vm.$forceUpdate();
  await nextTick();

  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets">
      <div class="ais-DynamicWidgets-widget">
        <div widget-name="ais-menu">
          test3
        </div>
      </div>
    </div>
  `);

  attributesToRender = ['test1', 'test4'];
  wrapper.vm.$forceUpdate();
  await nextTick();

  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets">
      <div class="ais-DynamicWidgets-widget">
        <div widget-name="ais-hierarchical-menu">
          [
          "test1",
          "test2"
          ]
        </div>
      </div>
      <div class="ais-DynamicWidgets-widget">
        <div class="ais-Panel">
          <div class="ais-Panel-body">
            <div widget-name="ais-refinement-list">
              test4
            </div>
          </div>
        </div>
      </div>
    </div>
  `);

  attributesToRender = [];
  wrapper.vm.$forceUpdate();
  await nextTick();

  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div class="ais-DynamicWidgets">
    </div>
  `);
});

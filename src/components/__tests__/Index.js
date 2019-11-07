import { mount } from '@vue/test-utils';
import Index from '../Index';
jest.mock('../../mixins/widget');

beforeEach(() => jest.clearAllMocks());

it('passes props to widgetParams', () => {
  const wrapper = mount(Index, {
    propsData: {
      indexName: 'the name',
      indexId: 'the id',
    },
  });

  expect(wrapper.vm.widgetParams).toEqual({
    indexName: 'the name',
    indexId: 'the id',
  });
});

it('exposes its widget', () => {
  mount(Index, {
    propsData: {
      indexName: 'index name',
    },
  });

  // TODO: test that it provides indexWidget to its children, how?
});

it('renders just a div by default', () => {
  const wrapper = mount(Index, {
    propsData: {
      indexName: 'index name',
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`

<div class="ais-Index">
</div>

`);
});

it('renders its children', () => {
  const wrapper = mount(Index, {
    propsData: {
      indexName: 'index name',
    },
    slots: {
      default: '<div>hi there!</div>',
    },
  });

  expect(wrapper.html()).toMatchInlineSnapshot(`

<div class="ais-Index">
  <div>
    hi there!
  </div>
</div>

`);
});

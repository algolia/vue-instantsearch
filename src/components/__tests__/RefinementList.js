import { mount } from '@vue/test-utils';
import RefinementList from '../RefinementList.vue';
import { __setState } from '../../component';
jest.mock('../../component');

const defaultState = {
  items: [
    {
      value: 'yo',
      label: 'yo',
      highlighted: 'y<em>o</em>',
      isRefined: false,
      count: 20,
    },
    {
      value: 'how',
      label: 'how',
      highlighted: 'how',
      isRefined: false,
      count: 10,
    },
    {
      value: 'are',
      label: 'are',
      highlighted: 'are',
      isRefined: false,
      count: 8,
    },
    {
      value: 'you',
      label: 'you',
      highlighted: 'you',
      isRefined: false,
      count: 9,
    },
    {
      value: 'doing',
      label: 'doing',
      highlighted: 'doing',
      isRefined: false,
      count: 100,
    },
    { value: '?', label: '?', highlighted: '?', isRefined: false, count: 0 },
  ],
};
it('renders correctly', () => {
  __setState({
    ...defaultState,
  });
  const wrapper = mount(RefinementList, {
    propsData: {
      attribute: 'something',
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});

it("renders correctly when it's searchable", () => {
  __setState({
    ...defaultState,
    searchable: true,
  });
  const wrapper = mount(RefinementList, {
    propsData: {
      attribute: 'something',
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});

it("disables show more if can't refine", () => {
  __setState({
    ...defaultState,
    canRefine: false,
  });
  const wrapper = mount(RefinementList, {
    propsData: {
      attribute: 'something',
      showMore: true,
    },
  });

  expect(
    wrapper.find('.ais-RefinementList-showMore').attributes().disabled
  ).toBe('disabled');

  wrapper.setData({ state: { canRefine: true } });
  expect(
    wrapper.find('.ais-RefinementList-showMore').attributes().disabled
  ).toBeUndefined();
});

it('behaves correctly', () => {
  __setState({
    ...defaultState,
    refine: jest.fn(),
  });
  const wrapper = mount(RefinementList, {
    propsData: {
      attribute: 'something',
    },
  });
  const button = wrapper.find('input[type="checkbox"]');
  button.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith('yo');
});

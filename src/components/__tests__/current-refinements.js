import { mount } from '@vue/test-utils';
import CurrentRefinements from '../CurrentRefinements.vue';
import { __setState } from '../../component';
jest.mock('../../component');

it('renders correctly (empty)', () => {
  __setState({
    refinements: [],
  });
  const wrapper = mount(CurrentRefinements);
  expect(wrapper.html()).toMatchSnapshot();
});

it('renders correctly (with refinements)', () => {
  __setState({
    refinements: [
      {
        attributeName: 'brands',
        computedLabel: 'apple',
      },
      {
        attributeName: 'colors',
        computedLabel: 'red',
      },
      {
        attributeName: 'requirements',
        computedLabel: 'free',
      },
    ],
  });
  const wrapper = mount(CurrentRefinements);
  expect(wrapper.html()).toMatchSnapshot();
});

it('calls `refine` with an item', () => {
  __setState({
    refinements: [
      {
        attributeName: 'brands',
        computedLabel: 'apple',
      },
      {
        attributeName: 'colors',
        computedLabel: 'red',
      },
      {
        attributeName: 'requirements',
        computedLabel: 'free',
      },
    ],
    refine: jest.fn(),
  });
  const wrapper = mount(CurrentRefinements);
  wrapper.find('.ais-CurrentRefinements-delete').trigger('click');

  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith({
    attributeName: 'brands',
    computedLabel: 'apple',
  });
});

it('calls `refine` with clear all', () => {
  __setState({
    refinements: [
      {
        attributeName: 'brands',
        computedLabel: 'apple',
      },
      {
        attributeName: 'colors',
        computedLabel: 'red',
      },
      {
        attributeName: 'requirements',
        computedLabel: 'free',
      },
    ],
    clearAllClick: jest.fn(),
  });
  const wrapper = mount(CurrentRefinements);
  wrapper.find('.ais-CurrentRefinements-reset').trigger('click');

  expect(wrapper.vm.state.clearAllClick).toHaveBeenCalled();
});

import { mount } from '@vue/test-utils';

import Menu from '../Menu.vue';
import { __setState } from '../../component';

jest.mock('../../component');

const defaultState = {
  canRefine: true,
  canToggleShowMore: false,
  createURL: jest.fn(),
  isShowingMore: false,
  items: [
    { value: 'foo', label: 'foo', count: 2, isRefined: true },
    { value: 'bar', label: 'bar', count: 3 },
    { value: 'foobar', label: 'foobar', count: 4 },
  ],
  refine: jest.fn(),
  toggleShowMore: jest.fn(),
};

it('should render correctly', () => {
  __setState(defaultState);

  const wrapper = mount(Menu, { propsData: { attribute: 'foo' } });
  expect(wrapper.html()).toMatchSnapshot();
});

it('should call `refine()` when click on an element', () => {
  __setState(defaultState);

  const wrapper = mount(Menu, { propsData: { attribute: 'foo' } });
  wrapper.find('ul > li:first-child').trigger('click');

  expect(defaultState.refine).toHaveBeenCalled();
  expect(defaultState.refine).toHaveBeenCalledWith(defaultState.items[0].value);
});

it('should call `toggleShowMore()` when possible', () => {
  __setState({ ...defaultState, canToggleShowMore: true });

  const wrapper = mount(Menu, {
    propsData: { attribute: 'foo', showMoreLimit: 10 },
  });
  wrapper.find('button').trigger('click');

  expect(defaultState.toggleShowMore).toHaveBeenCalled();
});

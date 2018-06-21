import { mount } from '@vue/test-utils';
import RefinementList from '../RefinementList.vue';
import { __setState } from '../../component';
jest.mock('../../component');

it('renders correctly', () => {
  __setState({
    hits: ['yo', 'how', 'are', 'you', 'doing', '?'],
  });
  const wrapper = mount(RefinementList);
  expect(wrapper.html()).toMatchSnapshot();
});

it('behaves correctly', () => {
  __setState({
    refine: jest.fn(),
  });
  const wrapper = mount(RefinementList);
  const button = wrapper.find('button');
  button.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith('hi');
});

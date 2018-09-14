import { mount } from '@vue/test-utils';
import GeoSearch from '../GeoSearch.vue';
import { __setState } from '../../mixins/component';
jest.mock('../../mixins/component');

it('renders correctly', () => {
  __setState({
    hits: ['yo', 'how', 'are', 'you', 'doing', '?'],
  });
  const wrapper = mount(GeoSearch);
  expect(wrapper.html()).toMatchSnapshot();
});

// ☑️ add another rendering test if it's different given the propsData

it('behaves correctly', () => {
  __setState({
    refine: jest.fn(),
  });
  const wrapper = mount(GeoSearch);
  const button = wrapper.find('button');
  button.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith('hi');
});

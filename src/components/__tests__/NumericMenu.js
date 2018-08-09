import { mount } from '@vue/test-utils';
import { __setState } from '../../component';
import NumericMenu from '../NumericMenu.vue';

jest.mock('../../component');

it('renders correctly', () => {
  __setState({
    hits: ['yo', 'how', 'are', 'you', 'doing', '?'],
  });

  const wrapper = mount(NumericMenu);

  expect(wrapper.html()).toMatchSnapshot();
});

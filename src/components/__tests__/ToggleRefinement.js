import { mount } from '@vue/test-utils';
import { __setState } from '../../component';
import Template from '../__Template.vue';

jest.mock('../../component');

const defaultState = {};

const defaultProps = {};

it('renders correctly', () => {
  __setState({
    ...defaultState,
  });

  const wrapper = mount(Template, {
    propsData: {
      defaultProps,
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

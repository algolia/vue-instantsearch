import { mount } from '@vue/test-utils';
import RangeInput from '../RangeInput.vue';
import { __setState } from '../../component';
jest.mock('../../component');

describe('rendering', () => {
  it('displays correctly with default values', () => {
    __setState({
      refine: jest.fn(),
    });
    const wrapper = mount(RangeInput, {
      propsData: {
        attributeName: 'price',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('displays correctly with a min', () => {
    __setState({
      refine: jest.fn(),
    });
    const wrapper = mount(RangeInput, {
      propsData: {
        attributeName: 'price',
        min: 100,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('displays correctly with a max', () => {
    __setState({
      refine: jest.fn(),
    });
    const wrapper = mount(RangeInput, {
      propsData: {
        attributeName: 'price',
        max: 100,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('displays correctly with a min and a max', () => {
    __setState({
      refine: jest.fn(),
    });
    const wrapper = mount(RangeInput, {
      propsData: {
        attributeName: 'price',
        min: 10,
        max: 37,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('refinement', () => {
  it('uses the value of the inputs when the form is submited', () => {
    __setState({
      refine: jest.fn(),
    });

    const wrapper = mount(RangeInput, {
      propsData: {
        attributeName: 'price',
      },
    });
    const minInput = wrapper.find('.ais-RangeInput-input--min');
    minInput.element.value = 100;
    const maxInput = wrapper.find('.ais-RangeInput-input--max');
    maxInput.element.value = 106;
    const form = wrapper.find('form');
    form.trigger('submit');
    expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith([100, 106]);
  });
});

import { mount } from '@vue/test-utils';
import SmartSort from '../SmartSort.vue';
import { __setState } from '../../mixins/widget';
jest.mock('../../mixins/widget');

describe('renders correctly', () => {
  test('no virtual replica', () => {
    __setState({
      isVirtualReplica: false,
      isSmartSorted: false,
    });
    const wrapper = mount(SmartSort);
    expect(wrapper.html()).toMatchInlineSnapshot(`undefined`);
  });

  test('not smart sorted', () => {
    __setState({
      isVirtualReplica: true,
      isSmartSorted: false,
    });
    const wrapper = mount(SmartSort);
    expect(wrapper.html()).toMatchInlineSnapshot(`

<div class="ais-SmartSort">
  <div class="ais-SmartSort-text">
  </div>
  <button type="button"
          class="ais-SmartSort-button"
  >
    See relevant results
  </button>
</div>

`);
  });

  test('smart sorted', () => {
    __setState({
      isVirtualReplica: true,
      isSmartSorted: true,
    });
    const wrapper = mount(SmartSort);
    expect(wrapper.html()).toMatchInlineSnapshot(`

<div class="ais-SmartSort">
  <div class="ais-SmartSort-text">
  </div>
  <button type="button"
          class="ais-SmartSort-button"
  >
    See all results
  </button>
</div>

`);
  });
});

it("calls the connector's refine function with 0 and undefined", () => {
  __setState({
    isSmartSorted: true,
    isVirtualReplica: true,
    refine: jest.fn(() => {
      wrapper.vm.state.isSmartSorted = !wrapper.vm.state.isSmartSorted;
    }),
  });

  const wrapper = mount(SmartSort);

  const button = wrapper.find('button');

  button.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith(0);

  button.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith(undefined);

  button.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith(0);
});

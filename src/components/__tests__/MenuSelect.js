import { mount } from '@vue/test-utils';
import MenuSelect from '../MenuSelect.vue';
import { __setState } from '../../component';

jest.mock('../../component');
jest.mock('../../panel');

const defaultState = {
  canRefine: true,
  items: [
    { label: 'Apple', value: 'Apple', isRefined: false, count: 50 },
    { label: 'Samsung', value: 'Samsung', isRefined: false, count: 20 },
    { label: 'Sony', value: 'Sony', isRefined: false, count: 15 },
  ],
};

const defaultProps = {
  attribute: 'brand',
};

it('accepts an attribute', () => {
  __setState({
    ...defaultState,
  });

  const props = {
    ...defaultProps,
  };

  const wrapper = mount(MenuSelect, {
    propsData: props,
  });

  expect(wrapper.vm.widgetParams.attributeName).toBe('brand');
});

it('accepts a limit', () => {
  __setState({
    ...defaultState,
  });

  const props = {
    ...defaultProps,
    limit: 5,
  };

  const wrapper = mount(MenuSelect, {
    propsData: props,
  });

  expect(wrapper.vm.widgetParams.limit).toBe(5);
});

it('accepts a sortBy', () => {
  __setState({
    ...defaultState,
  });

  const props = {
    ...defaultProps,
    sortBy: ['name:desc'],
  };

  const wrapper = mount(MenuSelect, {
    propsData: props,
  });

  expect(wrapper.vm.widgetParams.sortBy).toEqual(['name:desc']);
});

describe('default render', () => {
  it('renders correctly', () => {
    __setState({
      ...defaultState,
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = mount(MenuSelect, {
      propsData: props,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly with custom label', () => {
    __setState({
      ...defaultState,
    });

    const props = {
      ...defaultProps,
      label: 'None',
    };

    const wrapper = mount(MenuSelect, {
      propsData: props,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly with a selected value', () => {
    __setState({
      ...defaultState,
      items: [
        { label: 'Apple', value: 'Apple', isRefined: false, count: 50 },
        { label: 'Samsung', value: 'Samsung', isRefined: true, count: 20 },
        { label: 'Sony', value: 'Sony', isRefined: false, count: 15 },
      ],
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = mount(MenuSelect, {
      propsData: props,
    });

    const selected = wrapper.find('[value="Samsung"]');
    const options = wrapper.findAll('option:not([value="Samsung"])');

    expect(selected.element.selected).toBe(true);

    options.wrappers.forEach(option => {
      expect(option.element.selected).toBe(false);
    });
  });

  it('renders correctly without refinements', () => {
    __setState({
      ...defaultState,
      canRefine: false,
      items: [],
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = mount(MenuSelect, {
      propsData: props,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls refine on select change', () => {
    const refine = jest.fn();

    __setState({
      ...defaultState,
      refine,
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = mount(MenuSelect, {
      propsData: props,
    });

    expect(refine).not.toHaveBeenCalled();

    const select = wrapper.find('select');

    // Simulate the change
    select.element.value = 'Apple';

    select.trigger('change');

    expect(refine).toHaveBeenCalledTimes(1);
    expect(refine).toHaveBeenCalledWith('Apple');
  });

  it('calls the Panel mixin with `canRefine`', () => {
    __setState({ ...defaultState });

    const wrapper = mount(MenuSelect, {
      propsData: defaultProps,
    });

    const mapStateToCanRefine = () =>
      wrapper.vm.mapStateToCanRefine(wrapper.vm.state);

    expect(mapStateToCanRefine()).toBe(true);

    wrapper.setData({
      state: {
        canRefine: false,
      },
    });

    expect(mapStateToCanRefine()).toBe(false);
  });
});

describe('custom default render', () => {
  const defaultScopedSlots = `
    <select
      slot-scope="{ items, canRefine, refine }"
      @change="refine($event.currentTarget.value)"
      :disabled="!canRefine"
    >
      <option value="">All</option>
      <option
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :selected="item.isRefined"
      >
        {{item.label}}
      </option>
    </select>
  `;

  it('renders correctly', () => {
    __setState({
      ...defaultState,
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = mount(MenuSelect, {
      propsData: props,
      scopedSlots: {
        default: defaultScopedSlots,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly with a selected value', () => {
    __setState({
      ...defaultState,
      items: [
        { label: 'Apple', value: 'Apple', isRefined: false, count: 50 },
        { label: 'Samsung', value: 'Samsung', isRefined: true, count: 20 },
        { label: 'Sony', value: 'Sony', isRefined: false, count: 15 },
      ],
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = mount(MenuSelect, {
      propsData: props,
      scopedSlots: {
        default: defaultScopedSlots,
      },
    });

    const selected = wrapper.find('[value="Samsung"]');
    const options = wrapper.findAll('option:not([value="Samsung"])');

    expect(selected.element.selected).toBe(true);

    options.wrappers.forEach(option => {
      expect(option.element.selected).toBe(false);
    });
  });

  it('renders correctly without refinements', () => {
    __setState({
      ...defaultState,
      canRefine: false,
      items: [],
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = mount(MenuSelect, {
      propsData: props,
      scopedSlots: {
        default: defaultScopedSlots,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls refine on select change', () => {
    const refine = jest.fn();

    __setState({
      ...defaultState,
      refine,
    });

    const props = {
      ...defaultProps,
    };

    const wrapper = mount(MenuSelect, {
      propsData: props,
      scopedSlots: {
        default: defaultScopedSlots,
      },
    });

    expect(refine).not.toHaveBeenCalled();

    const select = wrapper.find('select');

    // Simulate the change
    select.element.value = 'Apple';

    select.trigger('change');

    expect(refine).toHaveBeenCalledTimes(1);
    expect(refine).toHaveBeenCalledWith('Apple');
  });
});

import { mount } from '../../../test/utils';
import { __setState } from '../../mixins/widget';
import SortBy from '../SortBy.vue';

jest.mock('../../mixins/widget');
jest.mock('../../mixins/panel');

const defaultState = {
  options: [
    { value: 'some_index', label: 'Relevance' },
    { value: 'some_index_cool', label: 'Coolness ascending' },
    { value: 'some_index_quality', label: 'Quality ascending' },
  ],
  hasNoResults: false,
  currentRefinement: 'some_index',
};

const defaultProps = {
  items: [
    { value: 'some_index', label: 'Relevance' },
    { value: 'some_index_cool', label: 'Coolness ascending' },
    { value: 'some_index_quality', label: 'Quality ascending' },
  ],
};

it('accepts transformItems prop', () => {
  __setState({ ...defaultState });

  const transformItems = () => {};

  const wrapper = mount(SortBy, {
    propsData: {
      ...defaultProps,
      transformItems,
    },
  });

  expect(wrapper.vm.widgetParams.transformItems).toBe(transformItems);
});

it('renders correctly', () => {
  __setState({ ...defaultState });

  const wrapper = mount(SortBy, {
    propsData: {
      ...defaultProps,
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});

it('renders with scoped slots', () => {
  const defaultSlot = `
  <template v-slot="{ items, refine, currentRefinement }">
    <select @change="refine($event.currentTarget.value)">
      <option
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :selected="item.value === currentRefinement"
      >
        {{item.label}}
      </option>
    </select>
  </template>
`;

  __setState({
    ...defaultState,
  });

  const wrapper = mount({
    components: { SortBy },
    data() {
      return { props: defaultProps };
    },
    template: `
      <SortBy v-bind="props">
        ${defaultSlot}
      </SortBy>
    `,
  });

  expect(wrapper.html()).toMatchSnapshot();
});

it('calls `refine` when the selection changes with the `value`', async () => {
  const refine = jest.fn();
  __setState({
    ...defaultState,
    refine,
  });
  const wrapper = mount(SortBy, {
    propsData: {
      ...defaultProps,
    },
  });
  // This is bad 👇🏽 but the only way for now to trigger changes
  // on a select: https://github.com/vuejs/vue-test-utils/issues/260
  const select = wrapper.find('select');
  select.element.value = 'some_index_quality';
  await select.trigger('change');
  const selectedOption = wrapper.find('option[value=some_index_quality]');

  expect(refine).toHaveBeenCalledTimes(1);
  expect(refine).toHaveBeenLastCalledWith('some_index_quality');
  expect(selectedOption.element.selected).toBe(true);
});

it('calls the Panel mixin with `hasNoResults`', async () => {
  __setState({ ...defaultState });

  const wrapper = mount(SortBy, {
    propsData: defaultProps,
  });

  const mapStateToCanRefine = () =>
    wrapper.vm.mapStateToCanRefine(wrapper.vm.state);

  expect(mapStateToCanRefine()).toBe(true);

  await wrapper.setData({
    state: {
      hasNoResults: true,
    },
  });

  expect(mapStateToCanRefine()).toBe(false);

  expect(wrapper.vm.mapStateToCanRefine({})).toBe(false);
});

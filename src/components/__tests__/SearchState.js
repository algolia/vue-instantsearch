import { mount } from '@vue/test-utils';
import SearchState from '../SearchState.vue';
import { __setState } from '../../mixins/component';
jest.mock('../../mixins/component');

it('renders explanation if no slot is used', () => {
  __setState({
    results: {
      query: 'q',
      hits: [{ objectID: '1', name: 'one' }, { objectID: '2', name: 'two' }],
      page: 1,
    },
  });
  const wrapper = mount(SearchState);
  expect(wrapper.html()).toMatchSnapshot();
});

it("doesn't render if no results", () => {
  __setState({});
  const wrapper = mount(SearchState);
  expect(wrapper.html()).toBeUndefined();
});

it('gives results to default slot', () => {
  const results = {
    query: 'q',
    hits: [{ objectID: '1', name: 'one' }, { objectID: '2', name: 'two' }],
    page: 1,
  };

  __setState({
    results,
  });

  mount(SearchState, {
    scopedSlots: {
      default: props => expect(props).toEqual(results),
    },
  });
});

it('allows default slot to render whatever they want', () => {
  __setState({
    results: {
      query: 'q',
      hits: [{ objectID: '1', name: 'one' }, { objectID: '2', name: 'two' }],
      page: 1,
    },
  });

  const wrapper = mount(SearchState, {
    scopedSlots: {
      default: `
      <template slot-scope="{ query }">
        <p v-if="query">
          There's no query
        </p>
        <p v-else>
          Query is here
        </p>
      </template>`,
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

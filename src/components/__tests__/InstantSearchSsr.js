import InstantSearchSsr from '../InstantSearchSsr';
import { mount } from '@vue/test-utils';
import instantsearch from 'instantsearch.js/es';

it('requires an injected instantsearch instance ($_ais)', () => {
  expect(() => mount(InstantSearchSsr)).toThrowErrorMatchingInlineSnapshot(
    `"When using SSR, it is required to use the rootMixin"`
  );
});

it('renders correctly (empty)', () => {
  const wrapper = mount(InstantSearchSsr, {
    provide: () => ({
      // eslint-disable-next-line camelcase
      $_ais: instantsearch({
        indexName: 'bla',
        searchClient: {},
      }),
    }),
  });

  expect(wrapper.html()).toMatchSnapshot();
});

it('renders correctly (with slot used)', () => {
  const wrapper = mount(InstantSearchSsr, {
    provide: () => ({
      // eslint-disable-next-line camelcase
      $_ais: instantsearch({
        indexName: 'bla',
        searchClient: {},
      }),
    }),
    slots: {
      default: '<div>Hi there, this is the main slot</div>',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

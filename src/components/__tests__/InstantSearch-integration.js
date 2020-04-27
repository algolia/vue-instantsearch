import { mount } from '@vue/test-utils';
import InstantSearch from '../InstantSearch';
import { createWidgetMixin } from '../../mixins/widget';

jest.unmock('instantsearch.js/es');

it('child widgets get added to its parent instantsearch', () => {
  const widgetInstance = {
    render() {},
  };

  const ChildComponent = {
    mixins: [createWidgetMixin({ connector: () => () => widgetInstance })],

    render() {
      return null;
    },
  };

  const wrapper = mount(InstantSearch, {
    propsData: {
      searchClient: {
        search(requests) {
          return Promise.resolve({
            results: requests.map(() => ({
              query: '',
              page: 0,
              hitsPerPage: 20,
              hits: [],
              nbHits: 0,
              nbPages: 0,
              params: '',
              exhaustiveNbHits: true,
              exhaustiveFacetsCount: true,
              processingTimeMS: 0,
            })),
          });
        },
      },
      indexName: 'something',
    },
    slots: {
      default: ChildComponent,
    },
  });

  expect(wrapper.vm.instantSearchInstance.mainIndex.getWidgets()).toContain(
    widgetInstance
  );
});

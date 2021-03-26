import Vue from 'vue';
import { mount } from '@vue/test-utils';
import InstantSearch from '../InstantSearch';
import { createWidgetMixin } from '../../mixins/widget';
import { createFakeClient } from '../../util/testutils/client';

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
      searchClient: createFakeClient(),
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

describe('middlewares', () => {
  it('subscribes middlewares', async () => {
    const subscribe = jest.fn();
    const middleware = () => ({
      subscribe,
      unsubscribe: () => {},
      onStateChange: () => {},
    });

    mount(InstantSearch, {
      propsData: {
        searchClient: createFakeClient(),
        indexName: 'indexName',
        middlewares: [middleware],
      },
    });
    await Vue.nextTick();

    expect(subscribe).toHaveBeenCalledTimes(1);
  });

  it('subscribes newly added middleware', async () => {
    const subscribe1 = jest.fn();
    const unsubscribe1 = jest.fn();
    const middleware1 = () => ({
      subscribe: subscribe1,
      unsubscribe: unsubscribe1,
      onStateChange: () => {},
    });

    const wrapper = mount(InstantSearch, {
      propsData: {
        searchClient: createFakeClient(),
        indexName: 'indexName',
        middlewares: [middleware1],
      },
    });
    await Vue.nextTick();
    expect(subscribe1).toHaveBeenCalledTimes(1);

    const subscribe2 = jest.fn();
    const unsubscribe2 = jest.fn();
    const middleware2 = () => ({
      subscribe: subscribe2,
      unsubscribe: unsubscribe2,
      onStateChange: () => {},
    });
    wrapper.setProps({
      middlewares: [middleware1, middleware2],
    });
    await Vue.nextTick();

    expect(subscribe1).toHaveBeenCalledTimes(1);
    expect(subscribe2).toHaveBeenCalledTimes(1);
    expect(unsubscribe1).toHaveBeenCalledTimes(0);
    expect(unsubscribe2).toHaveBeenCalledTimes(0);
  });
});

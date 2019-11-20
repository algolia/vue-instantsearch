import { mount } from '@vue/test-utils';
import Index from '../Index';
import { createWidgetMixin } from '../../mixins/widget';

it('provides a value which works with widgetMixin', () => {
  const widgetInstance = { render() {} };

  const ChildComponent = {
    name: 'child',
    mixins: [createWidgetMixin({ connector: () => () => widgetInstance })],
    render() {
      return null;
    },
  };

  const wrapper = mount(Index, {
    propsData: {
      indexName: 'something',
    },
    provide() {
      return {
        $_ais_instantSearchInstance: {
          addWidgets: jest.fn(),
        },
      };
    },
    slots: {
      default: ChildComponent,
    },
  });

  const indexWidget = wrapper.vm.widget;

  expect(indexWidget.getWidgets().includes(widgetInstance)).toBe(true);
});

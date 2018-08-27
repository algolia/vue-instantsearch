import { mount, createLocalVue } from '@vue/test-utils';
import mixin from '../component';

const createFakeComponent = localVue =>
  localVue.component('Test', {
    render: () => null,
  });

const createFakeInstance = () => ({
  addWidget: jest.fn(),
  removeWidget: jest.fn(),
});

it('adds a wdiget on create', () => {
  const localVue = createLocalVue();
  const instance = createFakeInstance();
  const Test = createFakeComponent(localVue);

  const widget = { render: () => {} };
  const factory = jest.fn(() => widget);
  const connector = jest.fn(() => factory);
  const widgetParams = {
    attribute: 'brand',
  };

  mount(Test, {
    mixins: [mixin],
    provide: {
      instantSearchInstance: instance,
    },
    data: () => ({
      connector,
      widgetParams,
    }),
  });

  expect(connector).toHaveBeenCalled();
  expect(factory).toHaveBeenCalledWith(widgetParams);
  expect(instance.addWidget).toHaveBeenCalledWith(widget);
});

it('removes a wdiget on destroy', () => {
  const localVue = createLocalVue();
  const instance = createFakeInstance();
  const Test = createFakeComponent(localVue);

  const widget = { render: () => {} };
  const factory = jest.fn(() => widget);
  const connector = jest.fn(() => factory);
  const widgetParams = {
    attribute: 'brand',
  };

  const wrapper = mount(Test, {
    mixins: [mixin],
    provide: {
      instantSearchInstance: instance,
    },
    data: () => ({
      connector,
      widgetParams,
    }),
  });

  expect(instance.addWidget).toHaveBeenCalledWith(widget);

  wrapper.destroy();

  expect(instance.removeWidget).toHaveBeenCalledWith(widget);
});

it('updates widget on widget params change', () => {
  const localVue = createLocalVue();
  const instance = createFakeInstance();
  const Test = createFakeComponent(localVue);

  const widget = { render: () => {} };
  const factory = jest.fn(() => widget);
  const connector = jest.fn(() => factory);

  const widgetParams = {
    attribute: 'brand',
  };

  const nextWidgetParams = {
    attribute: 'price',
  };

  const wrapper = mount(Test, {
    mixins: [mixin],
    provide: {
      instantSearchInstance: instance,
    },
    data: () => ({
      connector,
      widgetParams,
    }),
  });

  expect(instance.addWidget).toHaveBeenCalledTimes(1);
  expect(instance.addWidget).toHaveBeenCalledWith(widget);

  wrapper.vm.widgetParams = nextWidgetParams;

  expect(instance.removeWidget).toHaveBeenCalledTimes(1);
  expect(instance.removeWidget).toHaveBeenCalledWith(widget);

  expect(factory).toHaveBeenCalledTimes(2);
  expect(factory).toHaveBeenCalledWith(nextWidgetParams);

  expect(instance.addWidget).toHaveBeenCalledTimes(2);
  expect(instance.addWidget).toHaveBeenCalledWith(widget);
});

import {
  isVue3,
  h,
  createApp as createAppVue3,
  nextTick as nextTickVue3,
  Vue2,
} from '../../src/util/vue';

export const mount = isVue3
  ? (component, options = {}) => {
      const { propsData, mixins, provide, ...restOptions } = options;
      // If we `import` this, it will try to import Vue3-only APIs like `defineComponent`,
      // and jest will fail. So we need to `require` it.
      const wrapper = require('@vue/test-utils2').mount(component, {
        ...restOptions,
        props: propsData,
        global: {
          mixins,
          provide,
        },
      });
      wrapper.destroy = wrapper.unmount;
      return wrapper;
    }
  : require('@vue/test-utils').mount;

export const createApp = props => {
  if (isVue3) {
    return createAppVue3(props);
  } else {
    return new Vue2(props);
  }
};

export const createComponent = props => {
  const component = { ...props };
  if (props.render) {
    component.render = createElementV2 =>
      props.render(isVue3 ? h : createElementV2);
  }

  if (props.slots?.default?.render) {
    component.slots.default.render = createElementV2 =>
      props.render(isVue3 ? h : createElementV2);
  }

  return component;
};

export const nextTick = () => (isVue3 ? nextTickVue3() : Vue2.nextTick());

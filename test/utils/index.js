import {
  isVue3,
  h,
  createApp as createAppVue3,
  nextTick as nextTickVue3,
  Vue2,
} from '../../src/util/vue';

export const mount = isVue3
  ? (component, options = {}) => {
      const {
        propsData,
        mixins,
        provide,
        slots,
        scopedSlots,
        ...restOptions
      } = options;
      // If we `import` this, it will try to import Vue3-only APIs like `defineComponent`,
      // and jest will fail. So we need to `require` it.
      const wrapper = require('@vue/test-utils2').mount(component, {
        ...restOptions,
        props: propsData,
        global: {
          mixins,
          provide,
        },
        slots: {
          ...slots,
          ...scopedSlots,
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

export const renderCompat = fn => createElementV2 =>
  isVue3 ? fn(h) : fn(createElementV2);

export const nextTick = () => (isVue3 ? nextTickVue3() : Vue2.nextTick());

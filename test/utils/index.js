import { isVue3 } from 'vue-demi';
import { mount as mountVue2 } from '@vue/test-utils';

export const mount = isVue3
  ? (component, options = {}) => {
      const { propsData, ...restOptions } = options;
      // If we `import` this, it will try to import Vue3-only APIs like `defineComponent`,
      // and jest will fail. So we need to `require` it.
      return require('@vue/test-utils2').mount(component, {
        ...restOptions,
        props: propsData,
      });
    }
  : mountVue2;

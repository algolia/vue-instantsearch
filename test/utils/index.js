import { isVue3 } from 'vue-demi';
import { mount as mount1 } from '@vue/test-utils';
import { mount as mount2 } from '@vue/test-utils2';

export const mount = isVue3
  ? (component, options = {}) => {
      const { propsData, ...restOptions } = options;
      return mount2(component, {
        ...restOptions,
        props: propsData,
      });
    }
  : mount1;

import Vue from 'vue';

const isVue2 = true;
const isVue3 = false;
const Vue2 = Vue;
const version = Vue.version;

export { Vue, Vue2, isVue2, isVue3, version };

export function renderCompat(fn) {
  return function(createElement) {
    return fn.call(this, createElement);
  };
}

export function getDefaultSlot(component) {
  return component.$slots.default;
}

// Vue3-only APIs
export * from '@vue/composition-api';

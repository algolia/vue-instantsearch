import * as Vue from 'vue';

const isVue2 = false;
const isVue3 = true;
const Vue2 = undefined;

export { createApp, createSSRApp, h, version, nextTick } from 'vue';
export { Vue, Vue2, isVue2, isVue3 };

export function renderCompat(fn) {
  return function() {
    return fn.call(this, Vue.h);
  };
}

export function getDefaultSlot(component) {
  return component.$slots.default && component.$slots.default();
}

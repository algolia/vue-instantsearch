import * as Vue from 'vue';

const isVue2 = false;
const isVue3 = true;
const Vue2 = undefined;

export { createApp, createSSRApp, h, version, nextTick } from 'vue';
export { Vue, Vue2, isVue2, isVue3 };

export function renderCompat(fn) {
  function h(tag, props, children) {
    let flatProps = props;
    if (typeof props === 'object' && (props.attrs || props.props)) {
      // In vue 3, we no longer wrap with `attrs` or `props` key.
      flatProps = Object.assign({}, props, props.attrs, props.props);
      delete flatProps.attrs;
      delete flatProps.props;
    }

    let slots = children;
    if (typeof tag === 'object' && Array.isArray(children)) {
      slots = { default: () => children };
    }

    return Vue.h(tag, flatProps, slots);
  }

  return function() {
    return fn.call(this, h);
  };
}

export function getDefaultSlot(component) {
  return component.$slots.default && component.$slots.default();
}

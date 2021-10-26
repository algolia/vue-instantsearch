import { plugin } from './plugin';

// Automatically register Algolia Search components if Vue 2.x is available globally.
if (typeof window !== 'undefined' && window.Vue && window.Vue.version < '3.0.0') {
  window.Vue.use(plugin);
}

export { createSuitMixin } from './mixins/suit';
export { createWidgetMixin } from './mixins/widget';
export * from './widgets';

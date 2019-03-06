/* eslint import/namespace: ['error', { allowComputed: true }]*/

import * as widgets from './widgets';

export const plugin = {
  install(Vue) {
    Object.keys(widgets).forEach(widgetName => {
      Vue.component(widgets[widgetName].name, widgets[widgetName]);
    });
  },
};

import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import {createInstantSearch} from './instantsearch'

Vue.config.productionTip = false;

export async function createApp({
  beforeApp = () => {},
  afterApp = () => {},
} = {}) {
  const router = createRouter();
  const instantsearch = createInstantSearch();

  await beforeApp({
    router,
    instantsearch,
  });

  const app = new Vue({
    provide() {
      return {
        $_ais: instantsearch,
      };
    },

    router,
    render: h => h(App),
  });

  const result = {
    app,
    router,
    instantsearch
  };

  await afterApp(result);

  return result;
}

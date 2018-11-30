import { loadAsyncComponents } from '@akryum/vue-cli-plugin-ssr/client';

import { createApp } from './main';

createApp({
  async beforeApp({ router, instantsearch }) {
    instantsearch.injectOrHydrate();
    await loadAsyncComponents({ router });
  },

  afterApp({ app }) {
    app.$mount('#app');
  },
});

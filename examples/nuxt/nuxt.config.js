/* eslint-disable import/no-commonjs */

module.exports = {
  target: 'static',
  router: {
    base: '/examples/nuxt/',
  },
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
  },
};

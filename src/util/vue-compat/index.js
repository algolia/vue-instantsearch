/*
  By default, we maintain this repository based on Vue 2.
  That's why this file is exporting from `index-2`,
  which includes all the variables and methods for Vue 2.
  When it's built, rollup will replace it with either `index-2.js` or `index-3.js`.
*/
export * from './index-2';

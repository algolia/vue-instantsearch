/* eslint import/extensions: ['error', 'always'], import/no-commonjs: ['error', {allowRequire: true}] */
const assert = require('assert');

const VueInstantSearch2 = require('../../vue2/cjs/index.js');
const VueInstantSearch3 = require('../../vue3/cjs/index.js');

assert.ok(VueInstantSearch2);
assert.ok(VueInstantSearch3);

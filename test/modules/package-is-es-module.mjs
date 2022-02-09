/* eslint import/extensions: ['error', 'always'] */
import assert from 'assert';

import * as VueInstantSearch2 from '../../vue2/es/index.js';
import * as Vue2Widgets from '../../vue2/es/src/widgets.js';
import * as VueInstantSearch3 from '../../vue3/es/index.js';
import * as Vue3Widgets from '../../vue3/es/src/widgets.js';

assert.ok(VueInstantSearch2);
assert.ok(Vue2Widgets);

assert.ok(VueInstantSearch3);
assert.ok(Vue3Widgets);

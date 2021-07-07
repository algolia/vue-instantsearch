#!/bin/sh
set -e

# overwrite vue-utils with the v3
cp ./scripts/vue-utils-v3.js src/util/vue-utils.js

VUE_VERSION=vue3 rollup -c

# revert vue-utils to the v2
cp ./scripts/vue-utils-v2.js src/util/vue-utils.js

# put an index file for es output
cp ./scripts/es-index-template.js dist/vue3/es/index.js

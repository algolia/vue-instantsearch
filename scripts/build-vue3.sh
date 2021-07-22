#!/bin/sh
set -e

originalContent=`cat src/util/vue-compat/index.js`

originalContent2=`cat src/util/renderToString/index.js`

# use v3 for src/util/vue-compat
echo "export * from './index-3';" > src/util/vue-compat/index.js

# use v3 for src/util/renderToString
echo "export * from './index-3';" > src/util/renderToString/index.js

VUE_VERSION=vue3 rollup -c

# revert src/util/vue-compat
echo "$originalContent" > src/util/vue-compat/index.js

# revert src/util/renderToString
echo "$originalContent2" > src/util/renderToString/index.js

# put an index file for es output
cp ./scripts/es-index-template.js dist/vue3/es/index.js

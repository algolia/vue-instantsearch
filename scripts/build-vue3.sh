#!/bin/sh
set -e

vue-demi-switch 3
VUE_VERSION=vue3 rollup -c
echo "export * from './src/instantsearch.js';" > dist/vue3/es/index.js

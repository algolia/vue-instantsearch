#!/bin/sh
set -e

vue-demi-switch 2
VUE_VERSION=vue2 rollup -c
echo "export * from './src/instantsearch.js';" > dist/vue2/es/index.js

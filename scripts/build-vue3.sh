#!/bin/sh
set -e

VUE_VERSION=vue3 rollup -c

# put an index file for es output
cp ./scripts/es-index-template.js vue3/es/index.js

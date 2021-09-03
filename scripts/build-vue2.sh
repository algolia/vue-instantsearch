#!/bin/sh
set -e

VUE_VERSION=vue2 rollup -c

# put an index file for es output
cp ./scripts/es-index-template.js vue2/es/index.js

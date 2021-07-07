#!/bin/sh
set -e

VUE_VERSION=vue2 rollup -c
cp ./scripts/es-index-template.js dist/vue2/es/index.js

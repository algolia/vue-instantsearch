#!/usr/bin/env bash
# this builds examples, works from any directory (yarn build:examples)

set -e

# go into directory of script
cd $(dirname `which $0`)

for dir in ./* ; do
  if [ -d "$dir" ]; then
      name=$(basename "$dir")
      echo "building example: $name"
      cd $name
      yarn build
      cp -R dist ../../docs/dist/examples/$name
      cd ..
  fi
done

echo "done building examples 🙌"

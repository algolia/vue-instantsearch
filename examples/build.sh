#!/bin/bash

set -e

for dir in ./* ; do
  if [ -d "$dir" ]; then
      name=$(basename "$dir")
      echo "building $name"
      cd $name
      yarn build
      cp -R dist ../../docs/dist/examples/$name
      cd ..
  fi
done

echo "done building examples 🙌"

#!/bin/sh
project_root_dir=$(pwd)
rm -rf static
cd "client" || exit 1
rm -rf dist
npm run build -- --prod
mv dist "$project_root_dir/static"

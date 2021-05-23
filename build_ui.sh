#!/bin/sh
current_dir=$(pwd)
rm -rf static
cd ..
if [ -d "./ngQuote" ]
then
  echo "UI repository is found"
else
  git clone git@github.com:boale/ngQuote.git
  git checkout develop
  npm ci
fi
cd "ngQuote" || exit
rm -rf dist
npm run build
mv dist "$current_dir/t_dist"
cd "$current_dir" || exit
mv t_dist static


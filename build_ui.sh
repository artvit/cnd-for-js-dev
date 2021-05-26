#!/bin/sh
ui_environment="export const environment = {
  production: true,
  isAuthorizationEnabled: false,
  apiUrls: {
    auth: '',
    quote: '/api',
    share: '',
  },
};"
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
echo "$ui_environment" > src/environments/environment.prod.ts
npm run build -- --prod
mv dist "$current_dir/t_dist"
cd "$current_dir" || exit
mv t_dist static


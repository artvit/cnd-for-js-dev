#!/bin/sh
rm -rf static
cd "client" || exit 1
npm run build -- --prod

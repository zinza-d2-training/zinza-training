#!/bin/bash

# Exit on fail
set -e

# Start services
if [ ${APP_ENV} = "production" ]; then
    yarn start
else
    # Bundle install
    yarn install
    yarn add @next/swc-win32-x64-msvc @next/swc-linux-arm64-gnu @next/swc-linux-arm64-musl --ignore-platform
    yarn run dev
fi

# Finally call command issued to the docker service
exec "$@"

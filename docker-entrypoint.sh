#!/bin/bash

# Exit on fail
set -e

# Start services
if [ "${APP_ENV}" == "local" ]; then
  yarn install
  yarn run dev

else
  node server.js
fi

# Finally call command issued to the docker service
exec "$@"

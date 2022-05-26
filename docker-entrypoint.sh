#!/bin/bash

# Exit on fail
set -e

# Start services
if [ "${APP_ENV}" == "local" ]; then
  yarn install
  yarn run dev
  exec "$@"
else
  exec "$@"
fi

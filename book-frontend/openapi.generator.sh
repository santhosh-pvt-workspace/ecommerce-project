#!/bin/bash
#openapi.generator.sh
set -e

SWAGGER_JSON_DEV_ENDPOINT=$(grep -E "^SWAGGER_JSON_DEV_ENDPOINT=" openapi.url.env \
  | sed 's/SWAGGER_JSON_DEV_ENDPOINT=//; s/^"\(.*\)"$/\1/')

if [ -z "$SWAGGER_JSON_DEV_ENDPOINT" ]; then
  echo "SWAGGER_JSON_DEV_ENDPOINT is not set"
  exit 1
fi

echo "Using Swagger endpoint: $SWAGGER_JSON_DEV_ENDPOINT"

rm -rf src/api_temp src/_api
mkdir -p src/_api

pnpm openapi-generator-cli generate \
  -i "$SWAGGER_JSON_DEV_ENDPOINT" \
  -g typescript-axios \
  --skip-validate-spec \
  -o src/api_temp \
  --config openapi.config.json

cp src/api_temp/{api.ts,base.ts,common.ts,configuration.ts,index.ts} src/_api/
rm -rf src/api_temp

echo "API generated successfully ✅"

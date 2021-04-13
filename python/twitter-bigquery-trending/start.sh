#!/bin/bash

# note: to debug when the container won't stat, add `sh` to the end.
docker run \
    -it \
    -e GOOGLE_APPLICATION_CREDENTIALS_JSON="$GOOGLE_APPLICATION_CREDENTIALS_JSON" \
    -e BEARER_TOKEN="$BEARER_TOKEN" \
    twitter-bigquery-stream
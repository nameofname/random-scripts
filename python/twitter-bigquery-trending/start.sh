# /bin/bash

docker run \
    -it \
    -e GOOGLE_APPLICATION_CREDENTIALS_JSON="$GOOGLE_APPLICATION_CREDENTIALS_JSON" \
    -e BEARER_TOKEN="$BEARER_TOKEN" \
    twitter-bigquery-trending
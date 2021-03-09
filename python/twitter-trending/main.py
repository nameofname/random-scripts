import os
import json
import twitter_api as api

def pp(o):
    return print(json.dumps(o))


pp(api.delete_all_rules())

# api.set_rules([
#     { "value": "luxury has:images", "tag": "luxury with img"},
# ])

pp(
    api.set_rules([
        { "value": "cat has:images", "tag": "cat with img"},
        { "value": "dog has:images", "tag": "dog with img"}
    ])
)

api.get_stream()

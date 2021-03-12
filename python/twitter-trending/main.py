import os
import json
import twitter_api as twitter
import bigquery_api as bigquery

def pp(o):
    return print(json.dumps(o, indent=4, sort_keys=True))

rules = twitter.get_rules()
pp(rules)

pp(twitter.delete_all_rules())

rules = twitter.set_rules([
    { "value": "luxury has:images", "tag": "luxury with img"},
    # { "value": "cat has:images", "tag": "cat with img"},
    # { "value": "dog has:images", "tag": "dog with img"}
])

pp(rules)

def store_tweet(tweet):
    # Legacy : 
    # json_response = json.loads(response_line)
    # callback(json.dumps(json_response, indent=4, sort_keys=True))
    # print(tweet)
    # pp(json.loads(tweet))
    res = bigquery.store_record(tweet)
    print(res) # TODO - can i use pp ? i love pp. 

twitter.get_stream(store_tweet)

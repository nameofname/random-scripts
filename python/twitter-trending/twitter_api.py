import requests
import json
import os


bearer_token = os.environ.get("BEARER_TOKEN")
headers = {"Authorization": "Bearer {}".format(bearer_token)}


def get_rules():
    response = requests.get(
        "https://api.twitter.com/2/tweets/search/stream/rules", headers=headers
    )
    if response.status_code != 200:
        raise Exception(
            "Cannot get rules (HTTP {}): {}".format(response.status_code, response.text)
        )
    return response.json()


def set_rules(rules):
    """
    Usage : set_rules([
        {"value": "dog has:images", "tag": "dog pictures"},
        {"value": "cat has:images -grumpy", "tag": "cat pictures"},
    ])
    """
    response = requests.post(
        "https://api.twitter.com/2/tweets/search/stream/rules",
        headers=headers,
        json={"add": rules},
    )
    if response.status_code != 201:
        raise Exception(
            "Cannot add rules (HTTP {}): {}".format(response.status_code, response.text)
        )
    return response.json()


def delete_all_rules():
    return delete_rules(get_rules())


def delete_rules(rules):
    if rules is None or "data" not in rules:
        return None

    ids = list(map(lambda rule: rule["id"], rules["data"]))
    payload = {"delete": {"ids": ids}}
    response = requests.post(
        "https://api.twitter.com/2/tweets/search/stream/rules",
        headers=headers,
        json=payload
    )
    if response.status_code != 200:
        raise Exception(
            "Cannot delete rules (HTTP {}): {}".format(
                response.status_code, response.text
            )
        )
    return response.json()


def get_stream(callback):
    # url = "https://api.twitter.com/2/tweets/search/stream?tweet.fields=created_at,text,context_annotations,entities,in_reply_to_user_id,lang,non_public_metrics,organic_metrics,public_metrics"
    url = "https://api.twitter.com/2/tweets/search/stream?tweet.fields=created_at,text,context_annotations,entities,in_reply_to_user_id,lang,public_metrics"
    # response = requests.get(url, headers=headers, stream=True,)
    with requests.get(url, headers=headers, stream=True,) as response:
            # print(response.status_code)
            if response.status_code != 200:
                raise Exception(
                    "Cannot get stream (HTTP {}): {}".format(
                        response.status_code, response.text
                    )
                )
            for response_line in response.iter_lines():
                if response_line:
                    callback(json.loads(response_line))

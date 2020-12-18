from datetime import date
import time 
import requests 
import pandas as pd
from urllib.parse import urlparse, urlencode, parse_qs, urlunparse

csv = pd.read_csv('./buy-pages-with-sort-sample.csv', header=0, escapechar='\\')

def update_primary(r) :
    data = r.json() 
    primary_url = data['modules'][0]['items'][0]['primary_url']
    parsed = list(urlparse(primary_url))
    query = parse_qs(parsed[4]) # 4 is the query - have to use a list else it's immutable :|
    if ('sort' in query):
        del(query['sort'])
        parsed[4] = urlencode(query, doseq = True)
        updated_primary_url = urlunparse(parsed)
        # print(primary_url, '\n', updated_primary_url)
        data['modules'][0]['items'][0]['primary_url'] = updated_primary_url
        return data
    else :
        return None


for idx, row in csv.iterrows():
    buster = str(time.time()).split('.')[0]
    get_url = "https://qa.1stdibs.com/soa/cms-service/v1/{0}/action_getlive/?bypassCache=true&cache={1}".format(row.page_name, buster)
    print(get_url)
    put_url = "https://qa.1stdibs.com/soa/cms-service/v1/{0}/action_update".format(row.page_name)
    r = requests.get(get_url) 
    payload = update_primary(r)
    
    print(payload)
    if payload:
        res = requests.put(put_url, payload)
        if (str(res.status_code)[0] == '2') :
            print('SUCCESS')
        else :
            print('ERROR', res)

    else :
        print("nothing to update for {}".format(row.page_name))
    # print(payload)

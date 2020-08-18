import pandas as pd
import requests as request
import json

frame = pd.read_csv('buy_pages_missing_secondary.csv')
# have to change the type of the secondary url column or else you get an error : 
frame["secondary_url"] = frame["secondary_url"].astype(str) 
frame["error_status"] = ""
frame["error_response"] = ""

for idx, row in frame.iterrows():
    search_term = row.page_name.replace('buy:', '').replace('-', '+')
    res = request.get('https://www.1stdibs.com/soa/query-builder/1/dynamicBuyPage?searchTerm={}'.format(search_term))
    if res.status_code != 200:
        print('BAD RESPONSE FOR ', row)
        frame.at[idx, 'error_status'] = 'ERROR'
    else :
        res = res.json()
        if 'error' in res.keys() :
            print('ERROR for ', row)
            frame.at[idx, 'error_status'] = 'ERROR'
            frame.at[idx, 'error_response'] = json.dumps(res)
        else :
            primary_url = res['finalUriRefData']['url']
            secondary_url = res['matchedUriRef']
            frame.at[idx, 'primary_url'] = primary_url
            frame.at[idx, 'secondary_url'] = secondary_url
            frame.at[idx, 'error_status'] = 'SUCCESS'
    print('processing row {} with result {}'.format(idx, frame.at[idx, 'error_status']))
    # if idx == 1:
    #     break

frame.to_csv('fixed_results.csv')

# import json
import src.bigquery.bigquery_api as bqapi
from datetime import datetime, timedelta
import pytz


def get_time_range():
    query = """select end_date
        from `api-project-1065928543184.testing.twitter_luxury_entities`
        order by end_date desc
        limit 1;"""
    print("executing date query :\n{}".format(query))
    query = bqapi.query(query)
    res = query.result()
    start_time=False
    for row in res:
        start_time = row['end_date']

    end_time = start_time + timedelta(hours=1)
    # return [start_time.strftime('%Y-%m-%d %H:%M:%S UTC'), end_time.strftime('%Y-%m-%d %H:%M:%S UTC')]
    return [start_time, end_time]

def process_one_hour(time_range):

    start_date = time_range[0].strftime('%Y-%m-%d %H:%M:%S UTC')
    end_date = time_range[1].strftime('%Y-%m-%d %H:%M:%S UTC')
    # select for all tweets within that time range 
    query = """select *
        from `api-project-1065928543184.testing.twitter_luxury`
        where data.created_at > '{}'
        and data.created_at <= '{}'
        order by data.created_at desc
        ;""".format(start_date, end_date)
    print("executing batch query :\n{}".format(query))
    res = bqapi.query(query).result()

    # analyze entities in batch
    batch = ''
    for row in res:
        batch += row.data['text']
    result = bqapi.analyze_entities(batch)

    # for each entity recognized, store in bigquery
    for entity in result:
        store = {
            "start_date": start_date,
            "end_date": end_date,
            "name": str(entity['name']),
            "mentions": len(entity['mentions']),
            "type": entity['type']
        }
        # print(json.dumps(store))
        print('IM Not GOING TO STORE THISK>!>!>!>!', store)
        # bqapi.store_record(store, 'twitter_luxury_entities') 

# TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
# TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
# TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
# this should work until you reach the current time. 
def start():
    time_range = get_time_range()
    now = pytz.UTC.localize(datetime.now())

    # process entities until there isn't a full hour's worth of data to compare : 
    while now > time_range[1]:
        process_one_hour(time_range)
        time_range = get_time_range()

# import json
import bigquery_api as bigquery
from datetime import datetime
import pytz

# get a date range of the lst hour
now = datetime.utcnow()
date = now.strftime("%Y-%m-%d")
hour = now.strftime("%H")
last_hour = str(int(hour) - 1).zfill(2) # pad with zeros
min_sec = now.strftime("%M:%S")
start_date = "{} {}:{}".format(date, last_hour, min_sec)
end_date = "{} {}:{}".format(date, hour, min_sec)

# select for all tweets within that time range 
query = """select *
    from `api-project-1065928543184.testing.twitter_luxury`
    where data.created_at < '{}'
    and data.created_at > '{}'
    order by data.created_at desc
    limit 100;""".format(end_date, start_date)
print("executing batch query :\n{}".format(query))
res = bigquery.query(query)

# analyze entities in batch
batch = ''
for row in res:
    batch += row.data['text']
result = bigquery.analyze_entities(batch)

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
    bigquery.store_record(store, 'twitter_luxury_entities') 
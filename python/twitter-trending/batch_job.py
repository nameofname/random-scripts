import json
import bigquery_api as bigquery
from datetime import datetime
import pytz


now = datetime.utcnow()
date = now.strftime("%Y-%m-%d")
hour = now.strftime("%H")
last_hour = int(hour) - 1
min_sec = now.strftime("%M:%S")
start_date = "{} {}:{}".format(date, last_hour, min_sec)
end_date = "{} {}:{}".format(date, hour, min_sec)

query = """select *
    from `api-project-1065928543184.testing.twitter_luxury`
    where data.created_at < '{}'
    and data.created_at > '{}'
    order by data.created_at desc
    limit 100;""".format(end_date, start_date)

print(start_date, end_date)
print(query)
exit('ronald out')

res = bigquery.query(query)

batch = ''
for row in res:
    batch += row.data['text']
result = bigquery.analyze_entities(batch)
# print('=================================================================================')
for entity in result.entities:
    store = {
        "batch": date_range,
        "name": entity.name,
        "mentions": len(entity.mentions),
        "type": entity.type_
    }
    print('entity', store)
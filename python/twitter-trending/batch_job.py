import json
import bigquery_api as bigquery

def pp(o):
    return print(json.dumps(o, indent=4, sort_keys=True))

# TODO ! Re-write this query to get the tweets within a date range
res = bigquery.query(
    """select *
    from `api-project-1065928543184.testing.twitter_luxury`
    order by data.created_at desc
    limit 100;"""
)

batch = ''
for row in res:
    batch += row.data['text']

print('I have a batch! and its length is {}'.format(len(batch)))
print(batch)

print('=================================================================================')
result = bigquery.analyze_entities(batch)
print('I have a result! Who knows wtf it is?!?!?!')
print(result)
print('=================================================================================')
for entity in result.entities:
    print(entity.name)
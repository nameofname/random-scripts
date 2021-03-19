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

print('This is my batch : ')
print(batch)

print(
    bigquery.analyze_entities('bla bla')
)

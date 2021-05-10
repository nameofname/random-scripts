import src.bigquery.bigquery_api as bqapi


query_text = """
with distinct_days as (
    select distinct extract(date from e.start_date) as distinct_day,
    from `api-project-1065928543184.testing.twitter_luxury_entities` e
),
mentions_by_day as (
    select
        extract(date from e.start_date) as day,
        e.mentions
    from `api-project-1065928543184.testing.twitter_luxury_entities` e
    where upper(name) = upper('{}')
    limit 10
)
select 
    d.distinct_day as day,
    sum(ifnull(m.mentions, 0)) mentions
from distinct_days d
left join mentions_by_day m
    on d.distinct_day = m.day
group by day
order by day asc
;
"""


def query_entities(entity_name):
    return bqapi.query(query_text.format(entity_name))

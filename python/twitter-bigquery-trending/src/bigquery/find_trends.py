import src.bigquery.bigquery_api as bqapi

query_text = """
declare latest_date TIMESTAMP;
set latest_date = (select distinct start_date from `api-project-1065928543184.testing.twitter_luxury_entities` order by start_date desc limit 1);

with
# Get all distinct date ranges
start_dates as ( select distinct start_date as start_date from `api-project-1065928543184.testing.twitter_luxury_entities`),
# get all mentions for entities in the date range we care about - group / sum because some values are duplicate
latest_entities as (
    select name, sum(mentions) as mentions
    from `api-project-1065928543184.testing.twitter_luxury_entities`
    where start_date = latest_date
    and type  not in ('NUMBER', 'DATE', 'PHONE_NUMBER')
    group by name
),
# Create a matrix of those entities, and every possible date range.
total_matrix as (select * from latest_entities, start_dates),
# Sum the total number of mentions, for all time, for each of the entities we care about
summed_mentions as (
    select
        m.name,
        sum(e.mentions) as mention_sum
    from total_matrix m
    join `api-project-1065928543184.testing.twitter_luxury_entities` e
        on m.start_date = e.start_date and m.name = e.name
    group by m.name
),
# Next we divide the mention sum by the count of date ranges to get a real average
# and we juxtapose with the current number of mentions. 
averaged_mentions as (
select
    s.name,
    s.mention_sum,
    s.mention_sum / (select count(*) from start_dates) as average,
    l.mentions,
    ((1 / (s.mention_sum / (select count(*) from start_dates))) * l.mentions) as trend_score
from summed_mentions s
join latest_entities l on s.name = l.name
)
select
    a.*,
from averaged_mentions a
where a.mentions > 1
and a.mention_sum != a.mentions 
and a.trend_score > 10
order by a.mentions desc
;
"""

def get_trend_data():
    res = bqapi.query(query_text)
    return res.to_dataframe()

    # return res
    # for row in res:
    #     print(row)

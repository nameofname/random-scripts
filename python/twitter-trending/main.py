import twitter_to_bigquery, batch_job
from Repeater import Repeater

twitter_to_bigquery.start()
r = Repeater(batch_job.start, 3600) # every hour
r.start()
from google.cloud import bigquery

client = bigquery.Client()
table_id = 'api-project-1065928543184.testing.twitter_luxury'

def store_record(rec):
    errors = client.insert_rows_json(table_id, [rec])
    if errors == [] :
        print('inserted row', rec)
    else:
        print('Encountered erorrs while inserting row {}'.format(errors))
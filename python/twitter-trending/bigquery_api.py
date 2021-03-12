from google.cloud import bigquery
client = bigquery.client()

table_id = 'api-project-1065928543184.testing.twitter_luxury'

def store_record(record):
    # TODO !!!!!!!!!!!!!!!!! can i just insert 1 row?!?!?!?
    errors = client.insert_rows_json(table_id, [rows])
    if errors == [] :
        print('inserted row', record)
        else:
        print('Encountered erorrs while inserting row {}'.format(errors))
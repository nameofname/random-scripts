from google.cloud import bigquery, language_v1

client = bigquery.Client()
table_id = 'api-project-1065928543184.testing.twitter_luxury'

def store_record(rec):
    errors = client.insert_rows_json(table_id, [rec])
    if errors == [] :
        print('inserted row', rec)
    else:
        print('Encountered erorrs while inserting row {}\n{}'.format(errors, rec))
        print('Encountered erorrs while inserting row {}'.format(errors))

def query(query):
    query_job = client.query(query)  # Make an API request.
    return query_job

def analyze_entities(text_content):
    client = language_v1.LanguageServiceClient()
    request = {
        'encoding_type': language_v1.EncodingType.UTF8,
        'document': {
            'content': text_content,
            'language': 'en',
            'type_': language_v1.Document.Type.PLAIN_TEXT # HTML also available
        }
    }
    return client.analyze_entities(request)




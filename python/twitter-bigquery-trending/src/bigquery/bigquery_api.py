from google.cloud import bigquery, language_v1
from google.oauth2 import service_account
import json, os

# Enable passing credentials JSON via an environment variable :
credentials = service_account.Credentials.from_service_account_info(
    json.loads(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON'))
)
client = bigquery.Client(credentials=credentials, project=credentials.project_id)

# table names : twitter_luxury, twitter_luxury_entities
table_prefix = 'api-project-1065928543184.testing.'

def store_records(rec, table_name):
    table_id = table_prefix + table_name
    errors = client.insert_rows_json(table_id, [rec])
    if errors == [] :
        print('Storing record in {}'.format(table_name), rec)
    else:
        print('Encountered erorrs while inserting row {}\n{}'.format(errors, rec))

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
    result = client.analyze_entities(request)
    list = []
    for entity in result.entities:
        list.append({
            "name": entity.name,
            "mentions": entity.mentions,
            "type": language_v1.Entity.Type(entity.type_).name
        })
    return list

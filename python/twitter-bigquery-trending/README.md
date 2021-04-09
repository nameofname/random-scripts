# Twitter BigQuery Trending

This is a script that reads from twitter, writes to BigQuery, and periodically runs Google's entity recognition on twitter data, storing the result in a separate place in BigQuery

## Running the script

Running requires 2 env vars : 
- BEARER_TOKEN: auth for Twitter
- GOOGLE_APPLICATION_CREDENTIALS_JSON: auth for BigQuery

The command to run is contained in start.sh - set the env vars in your $PATH and execute that file

## Running in Docker + AWS

AWS provides the following push commands 

- aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin {AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com
- docker build -t twitter-bigquery-trending .
- docker tag twitter-bigquery-trending:latest {AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/twitter-bigquery-trending:latest
- docker push {AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/twitter-bigquery-trending:latest

Note(*) replace {AWS_ACCOUNT_ID} with the account ID for the AWS account you want to deploy the container to. 
1stdibs only has a prod and QA account, and the account is different from my personal user data. 
Because we have 2 different accounts, the default is configured to be the QA one for me, so the login command must be modified to look like this : 

- aws ecr get-login-password --region us-east-1 --profile serverless | docker login --username AWS --password-stdin {AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com

Note(*) here the "serverless" profile is the QA account. 
# Davis Custom Actions Examples

This repository is for examples of custom action webhook handlers for [davis](davis.dynatrace.com).

## Express

The express example is meant to be run on your own hardware, potentially in your DMZ so that it can access your JIRA/ServiceNow/Dynatrace/etc servers.

### Deployment Directions

```bash
# enter the express directory
cd express

# install dependencies
npm install

# run the project
npm start
```

## AWS Lambda

The AWS Lambda example is a [serverless](serverless.com) project, but can be easily run in AWS Lambda without the serverless framework using an API gateway and a Lambda function.

### Deployment Directions

```bash
# Enter the lambda directory
cd lambda

# install dependencies
npm install

# deploy
serverless deploy
```

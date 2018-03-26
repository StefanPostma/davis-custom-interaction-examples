# Davis Custom Actions Examples

This repository is for examples of custom action webhook handlers for [davis](davis.dynatrace.com). Most of the events simply echo the event name back to davis, except the Full Text Interception and Extend Problem Detail events. The Full Text Interception expects to be set up with the regular expression `^echo` and echoes the user's text back to them. The Extend Problem Detail event expects JIRA configuration in `config.json` and will offer to create JIRA tickets.

The JIRA ticket creation uses HTTP Basic Authentication. It is not meant for production use and Dynatrace does not recommend the use of HTTP Basic Authentication in production JIRA installations.

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

# Disclaimer

This software is experimental and currently NOT SUPPORTED by Dynatrace. Please use at your own risk. You can contact the author via Github issues.

# License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
"use strict";

const rp = require("request-promise");
const config = require("./config");

module.exports.createTicket = (summary, description, callback) => {
  const body = {
    fields: {
      project: {
        id: config.JIRA_PROJECT,
      },
      summary,
      description,
      issuetype: {
        id: config.JIRA_ISSUE_TYPE,
      },
      assignee: {
        name: config.JIRA_USER,
      },
    },
  };
  return rp.post({
    auth: {
      user: config.JIRA_USER,
      pass: config.JIRA_PASSWORD,
    },
    baseUrl: config.JIRA_SERVER,
    body,
    uri: "/rest/api/2/issue",
    json: true,
  })
  .then((ticket) => callback(null, ticket))
  .catch((err) => callback(err));
};

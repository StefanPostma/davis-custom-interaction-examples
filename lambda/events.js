"use strict";

const config = require("./config");
const { delegate, say, success } = require("./responses");
const jira = require("./jira");

module.exports.fullTextInterception = (body, callback) => {
  console.log(body);
  if (body.payload.text.match(/^echo\s+/)) {
    return callback(null, success(say(body.payload.text.replace(/^echo\s+/i, ""))));
  }
  return callback(null, success(delegate()));
};

module.exports.preReport = (body, callback) => {
  callback(null, success(say(`Received event ${body.event}.`)));
};

module.exports.postReport = (body, callback) => {
  if (body.type === "validate") {
    return callback(null, success(say('Say yes to run the next custom action.', "Or click here")));
  }
  return callback(null, success(say(`Received confirmation for event ${body.event}.`)));
};

module.exports.postProblemDetail = (body, callback) => {
  if (
    config.JIRA_SERVER &&
    config.JIRA_USER &&
    config.JIRA_PASSWORD &&
    config.JIRA_ISSUE_TYPE &&
    config.JIRA_PROJECT
  ) {
    if (body.type === "validate") {
      return callback(null, success(say("Would you like to create a JIRA ticket?", "Create Ticket")));
    }

    return jira.createTicket(
      body.payload.problem.title,
      body.payload.problem.url,
      (err, ticket) => {
        if (err) { return callback(err); }
        return callback(null, success(say(`Created ticket ${ticket.key} assigned to ${config.JIRA_USER}.`)));
      });
  }
  return callback(null, success(say("Add JIRA configuration parameters to 'config.json' to create a JIRA ticket.")));
};

module.exports.postEntityDetail = (body, callback) => {
  if (body.type === "validate") {
    return callback(null, success(say('Say yes to run the next custom action.', "Or click here")));
  }
  return callback(null, success(say(`Received confirmation for event ${body.event}.`)));
};


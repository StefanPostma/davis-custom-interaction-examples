"use strict";

const config = require("./config");
const { delegate, say } = require("./responses");
const jira = require("./jira");

module.exports.fullTextInterception = (req, res, next) => {
  console.log(req.body);
  if (req.body.payload.text.match(/^echo/)) {
    return res.json(say(req.body.payload.text));
  }
  return res.json(delegate())
};

module.exports.preReport = (req, res, next) => {
  res.json(say(`Received event ${req.body.event}.`));
};

module.exports.postReport = (req, res, next) => {
  if (req.body.type === "validate") {
    return res.json(say("Say yes to run the next custom action", "Or click here"));
  }
  return res.json(say(`Received confirmation for event ${req.body.event}.`));
};

module.exports.postProblemDetail = async (req, res, next) => {
  if (
    config.JIRA_SERVER &&
    config.JIRA_USER &&
    config.JIRA_PASSWORD &&
    config.JIRA_ISSUE_TYPE &&
    config.JIRA_PROJECT
  ) {
    if (req.body.type === "validate") {
      return res.json(say("Would you like to create a JIRA ticket?", "Create Ticket"));
    }

    const ticket = await jira.createTicket(
      req.body.payload.problem.title,
      req.body.payload.problem.url,
    );

    return res.json(say(`Created ticket ${ticket.key} assigned to ${config.JIRA_USER}.`));
  }
  if (req.body.type === "validate") {
    return res.json(say("Say yes to run the next custom action", "Or click here"));
  }
  return res.json(say(`Received confirmation for event ${req.body.event}.`));
};

module.exports.postEntityDetail = (req, res, next) => {
  if (req.body.type === "validate") {
    return res.json(say("Say yes to run the next custom action", "Or click here"));
  }
  return res.json(say(`Received confirmation for event ${req.body.event}.`));
};


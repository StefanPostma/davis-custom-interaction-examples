"use strict";

const events = require("./events");
const { delegate } = require("./responses");

module.exports.authorize = function(clientSecret) {
  return function (req, res, next) {
    if (req.headers.authorization !== `Token ${clientSecret}`) {
      return res.sendStatus(401);
    }
    return next();
  };
}

module.exports.handleEvents = function() {
  return function (req, res, next) {
    const event = req.body.event;

    const handler = events[event];
    if (handler) { return handler(req, res, next); }
    return next(new Error(`Unknown event type ${event}.`));
  }
};

module.exports.handleErrors = function () {
  return function (err, req, res, next) {
    console.error(err.message);
    console.error("Attempting to delegate due to error.");
    return res.json(delegate());
  };
};

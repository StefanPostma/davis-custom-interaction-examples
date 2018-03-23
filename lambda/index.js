
"use strict";

const config = require("./config");
const events = require("./events");
const { delegate } = require("./responses");

module.exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event, null, 2));
  if (!event.headers || event.headers.Authorization !== `Token ${config.CLIENT_SECRET}`) {
    return callback(null, { statusCode: 401, body: "Unauthorized" });
  }

  const body = JSON.parse(event.body);
  const eventName = body.event;

  const handler = events[eventName];
  if (!handler) {
    console.error(`Unexpected event from davis: '${eventName}'.`);
    return callback(null, { statusCode: 200, body: delegate() });
  }

  return handler(body, (err, res) => {
    console.log(res);
    callback(err, res);
  });
}

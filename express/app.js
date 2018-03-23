"use strict";

const app = require("express")();
const morgan = require("morgan");
const { json } = require("body-parser");
const { authorize, handleEvents, handleErrors } = require("./middlewares");

const config = require("./config");
Object.freeze(config);

// parse json request bodies into req.body
app.use(json({ limit: "1mb" }));

// log requests
app.use(morgan("combined"));

app.use(authorize(config.CLIENT_SECRET));
app.use("/event", handleEvents(), handleErrors());

const port = config.PORT || process.env.PORT || 8080;
app.listen(port);
console.log(`Listening on port ${port}`);

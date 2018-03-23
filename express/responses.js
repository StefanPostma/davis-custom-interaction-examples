"use strict";

module.exports.delegate = () => ({
  delegate: true,
});

module.exports.say = (text, confirmation) => ({
  response: {
    text,
    confirmationButtonName: (confirmation && (typeof confirmation === "string")) ?
      confirmation :
      undefined,
  },
  confirmation: !!confirmation,
})

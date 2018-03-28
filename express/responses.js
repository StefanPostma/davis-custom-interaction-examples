"use strict";

module.exports.delegate = () => ({
  delegate: true,
});

module.exports.say = (text, confirmation, actions) => ({
  response: {
    text,
    actions,
    confirmationButtonName: (confirmation && (typeof confirmation === "string")) ?
      confirmation :
      undefined,
  },
  confirmation: !!confirmation,
})

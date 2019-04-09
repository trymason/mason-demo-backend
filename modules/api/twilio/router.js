const express = require("express");
const controller = require("./controller");

module.exports = () => {
  const router = express.Router();

  router.route("/twilio/chat-token")
  .get(controller.generateChatToken)

  return router;
};
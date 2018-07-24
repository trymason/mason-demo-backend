const express = require("express");
const controller = require("./controller");

module.exports = () => {
  const router = express.Router();

  router.route("/channels")
  .get(controller.channelsIndex)
  .post(controller.channelsCreate);

  router.route("/channels/:channelId")
  .get(controller.channelsShow);

  router.route("/channels/:channelId/conversations")
  .get(controller.channelsConversationsIndex);

  return router;
};

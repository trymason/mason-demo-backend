const express = require("express");
const controller = require("./controller");

module.exports = () => {
  const router = express.Router();

  router.route("/channels")
  .get(controller.channelsIndex);

  router.route("/channels/:channelId")
  .get(controller.channelsShow);

  router.route("/channels/test")
  .get(controller.channelsTest);

  router.route("/channels/:channelId/conversations")
  .get(controller.channelsConversationsIndex)
  .post(controller.channelsConversationsCreate);

  return router;
};

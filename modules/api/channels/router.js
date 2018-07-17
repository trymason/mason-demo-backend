const express = require("express");
const controller = require("./controller");

module.exports = () => {
  const router = express.Router();

  router.route("/channels")
  .get(controller.channelsIndex);

  router.route("/channels/:channelId")
  .get(controller.channelsShow);

  return router;
};

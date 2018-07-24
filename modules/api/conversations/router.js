const express = require("express");
const controller = require("./controller");

module.exports = () => {
  const router = express.Router();

  router.route("/conversations")
  .post(controller.conversationsCreate)

  return router;
};
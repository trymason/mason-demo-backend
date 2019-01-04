const express = require("express");
const controller = require("./controller");

module.exports = () => {
  const router = express.Router();

  router.route("/sms")
  .get(controller.smsIndex)
  .post(controller.smsCreate);

  return router;
};

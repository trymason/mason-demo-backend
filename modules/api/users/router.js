const express = require("express");
const controller = require("./controller");

module.exports = () => {
  const router = express.Router();

  router.route("/users/login")
  .post(controller.usersLogin);

  router.route("/users")
  .post(controller.usersCreate);

  return router;
};

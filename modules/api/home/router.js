const express = require("express")
const controller = require("./controller")

module.exports = () => {
  const router = express.Router()

  router.route("/login")
  .post(controller.loginUser)

  router.route("/signup")
  .post(controller.usersCreate)

  router.route("/user")
  .get(controller.usersShow)

  router.route("/authy")
  .post(addAuthyID)

  return router
}

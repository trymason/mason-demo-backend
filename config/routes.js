const vhost = require('vhost')
const apiRoutes = require("../modules/api/home/router")()

const { reqLocals } = require("../middleware")

module.exports = app => {
  app.use("/", reqLocals(app), apiRoutes)
}

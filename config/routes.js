const apiRoutes = require("../modules/api/users/router")();

const { reqLocals } = require("../middleware");

module.exports = app => {
  app.use("/", reqLocals(app), apiRoutes);
};

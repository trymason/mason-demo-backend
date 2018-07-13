const userRoutes = require("../modules/api/users/router")();
const channelRoutes = require("../modules/api/channels/router")();

const { reqLocals } = require("../middleware");

module.exports = app => {
  app.use("/", reqLocals(app), userRoutes);
  app.use("/", reqLocals(app), channelRoutes);
};

const userRoutes = require("../modules/api/users/router")();
const channelRoutes = require("../modules/api/channels/router")();
const conversationRoutes = require("../modules/api/conversations/router")();

const { reqLocals } = require("../middleware");

module.exports = app => {
  app.use("/", reqLocals(app), userRoutes);
  app.use("/", reqLocals(app), channelRoutes);
  app.use("/", reqLocals(app), conversationRoutes);
};

const CronRoutes = require("./cron.route");

function routes(app) {
  app.use("/", CronRoutes);
}

module.exports = routes;

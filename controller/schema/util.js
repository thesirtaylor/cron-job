const schemaModel = require("../../model/schema.model");
const jobModel = require("../../model/jobRecordModel.mode");
const Agenda = require("agenda");
const config = require("../../config/config");

async function createSchema(data) {
  const createScheme = await schemaModel.create(data);

  const cronJobTimeIntervalInHours = 6;
  const nextRun = moment().add(cronJobTimeIntervalInHours, "h");
  const threedaysFromNow = 3;
  const expiredAt = moment().add(threedaysFromNow, "d"); //job expires after 3 days

  //create job that shall be run by cron
  await jobModel.create({
    expiredAt,
    nextRun,
    schema: createScheme._id,
  });

  return createScheme;
}


module.exports = {
  createSchema,
};

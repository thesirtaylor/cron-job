const schemaModel = require("../../model/schema.model");
const Agenda = require("agenda");
const config = require("../../config/config");
const agenda = new Agenda({
  db: {
    address: config.db,
    collection: "cron-job",
  },
});

async function createSchema(data) {
  return schemaModel.create(data);
}

async function cronJobUpDate(id) {
  const num = 1;
  agenda.define(id, async (job, done) => {
    try {
      const { id, number } = job.attrs.data;
      console.log("number", number);
      const updateSchema = await schemaModel.findOneAndUpdate(
        { _id: id },
        { $inc: { initial: number } },
        { new: true }
      );
      if (updateSchema.initial > 20) {
        done();
        await job.remove();
      }
      console.log("schema", updateSchema);
      done();
    } catch (error) {
      console.log(error);
      done();
    }
  });

  (async function () {
    await agenda.start();
    await agenda.every("1 minute", id, {
      id: id,
      number: num,
    });
  })();

  agenda.on("error", function (err) {
    console.log("Agenda error:");
    console.log(err);
  });
}
module.exports = {
  createSchema,
  cronJobUpDate,
};

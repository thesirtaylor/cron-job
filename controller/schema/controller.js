const { createSchema, cronJobUpDate } = require("./util");

const CreateSchema = async (req, res) => {
  try {
    const { body } = req;
    const resp = await createSchema(body);
    return res.status(200).send(resp);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const CreateCronJob = async (req, res) => {
  try {
    const { id } = req.query;
    const resp = await cronJobUpDate(id);
    return res.status(200).send("cron job intialized");
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  CreateSchema,
  CreateCronJob,
};

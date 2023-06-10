const moment = require("moment");
const jobModel = require("../model/jobRecordModel.mode");

async function theJobFunction() {
  const start = moment().format();
  const end = moment().add(6, "h").format();

  //find all jobs that should run between now and the next 6 hours
  const jobs = await jobModel.find({
    nextRun: {
      $gte: start,
      $lt: end,
    },
  });

  jobs.forEach(async (job) => {
    try {
      const { _id } = job;

      if (condition) {
        //check job condition

        console.log("run function to do main job here");

        await jobModel.deleteOne({ _id }); //delete job since it is done
      } else if (moment(start).diff(job.expiredAt) > 0) {
        //if time constraint elapses

        console.log("run function to do other job");

        await jobModel.deleteOne({ _id }); //delete job since it is done
      } else {
        //set job to run in the next cyclce
        const cronJobIntervalInHours = 6;
        const nextRun = moment().add(cronJobIntervalInHours, "h");
        await jobModel.findOneAndUpdate(
          { _id },
          { $set: { nextRun } },
          { new: true }
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  });
}

module.exports = {
  theJobFunction,
};

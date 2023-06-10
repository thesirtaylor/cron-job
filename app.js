require("dotenv").config();
const db = require("./config/db");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const morgan = require("morgan");
const job = require("./util/job");
const cron = require("node-cron");

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use("/health", (req, res) => {
  res.status(200).send("Success");
});
db()//connect to db first
  .then()
  .catch((err) => {
    console.log("db connection error", err);
  });

//run the job when the server starts
setTimeout(job.theJobFunction, 30000); //first run it immediately

let task = cron.schedule("0 */6 * * *", () => {
  //run every 6 hours

  //we could list all cron job functions here
  job.theJobFunction();
});
task.start();

routes(app);
const PORT = process.env.PORT || 1995;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

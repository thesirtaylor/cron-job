require("dotenv").config();
const db = require("./config/db");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const morgan = require("morgan");
const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use("/health", (req, res) => {
  res.status(200).send("Success");
});
db()
  .then()
  .catch((err) => {
    console.log("db connection error", err);
  });
routes(app);
const PORT = process.env.PORT || 1995;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

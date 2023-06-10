const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    expiredAt: {
      type: Date,
      required: true,
    },
    nextRun: {
      type: Date,
      required: true,
    },
    schema: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("jobs", schema);

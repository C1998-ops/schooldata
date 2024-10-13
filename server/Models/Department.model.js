const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    departmentName: {
      required: true,
      type: String,
    },
    shortName: {
      required: true,
      type: String,
    },
    startTime: String,
    endTime: String,
    isActive: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Departments", dataSchema);

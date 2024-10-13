const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    departmentName: {
      required: true,
      type: String,
    },
    categoryName: {
      type: String,
      required: true,
    },
    shortName: {
      required: true,
      type: String,
    },
    imageUrl: String,

    isActive: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", dataSchema);

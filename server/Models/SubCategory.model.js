const mongoose = require("mongoose");
const subSchema = new mongoose.Schema(
  {
    departmentName: {
      required: true,
      type: String,
    },
    categoryName: {
      required: true,
      type: String,
    },
    subCategoryName: String,
    shortName: {
      required: true,
      type: String,
    },
    imageUrl: String,
    isActive: Boolean,
  },
  { timestamps: true }
);
module.exports = mongoose.model("subCategory", subSchema);

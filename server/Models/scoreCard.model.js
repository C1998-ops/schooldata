const mongoose = require("mongoose");
const ItemModel = new mongoose.Schema(
  {
    cardLabel: String,
    cardColor: String,
    cardValue: String,
    isNegative: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const subSchema = new mongoose.Schema(
  {
    scoreCardTitle: {
      type: String,
      required: true,
    },
    scoreCardIsActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    scoreItems: [ItemModel],
  },
  { timestamps: true }
);
module.exports = mongoose.model("scoreCard", subSchema);

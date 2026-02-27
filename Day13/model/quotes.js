const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: "Unknown",
    },
    category: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: "default",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);

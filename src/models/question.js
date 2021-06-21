const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Option = require("./option");

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [Option.Schema],
    correctOption: {
      type: Number,
    },
    explanation: {
      type: String,
      default: "No explanation available",
    },
    multiCorrect: {
      type: Boolean,
      default: false,
    },
    correctOptions: [{ type: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", questionSchema);

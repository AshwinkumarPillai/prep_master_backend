const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        _id: {
          type: Number,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
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

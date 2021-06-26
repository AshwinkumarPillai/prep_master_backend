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
          type: String,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    correctOption: {
      type: String,
    },
    explanation: {
      type: String,
      default: "No explanation available",
    },
    multiCorrect: {
      type: Boolean,
      default: false,
    },
    correctOptions: [{ type: String }],
  },
  { timestamps: true }
);

// questionSchema.index({ title: "text" });

module.exports = mongoose.model("question", questionSchema);

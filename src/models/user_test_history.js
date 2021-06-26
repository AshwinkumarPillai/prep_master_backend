const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    version: {
      type: Number,
      default: 1,
    },
    testId: {
      type: Schema.Types.ObjectId,
      ref: "test",
    },
    score: {
      type: Number,
      default: 0,
    },
    test_data: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "question",
        },
        selectedOptions: [String],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("testHistory", testHistorySchema);

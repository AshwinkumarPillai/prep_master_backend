const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserTestData = require("./user_test_data");

const testHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    testId: {
      type: Schema.Types.ObjectId,
      ref: "test",
    },
    score: {
      type: Number,
      default: 0,
    },
    data: [UserTestData.Schema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("testHistory", testHistorySchema);

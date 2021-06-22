const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTestDataSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "question",
  },
  selectedOptions: [
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
});

module.exports = mongoose.model("userTestData", userTestDataSchema);

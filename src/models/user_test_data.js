const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Option = require("./option");

const userTestDataSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "question",
  },
  selectedOptions: [Option.Schema],
});

module.exports = mongoose.model("userTestData", userTestDataSchema);

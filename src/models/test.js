const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time_limit: {
      type: Number,
      default: -1,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    questions: [{ type: Schema.Types.ObjectId, ref: "question" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("test", testSchema);

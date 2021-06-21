const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  _id: {
    type: Number,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("option", optionSchema);

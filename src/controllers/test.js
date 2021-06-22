const Test = require("../models/test");

const asyncCatch = require("../middleware/async_catch").asyncCatch;
const { BadUserInput, EntityNotFound } = require("../utils/custom_error");

module.exports.addTest = asyncCatch(async (req, res) => {
  let { name, time_limit } = req.body;
  if (!name) throw new BadUserInput();
  let test = new Test({ name, time_limit });
  await test.save();
  return res.json({ message: "Test Created Successfully!", test, status: 200 });
});

module.exports.updateTest = asyncCatch(async (req, res) => {
  let { testId, name, time_limit, questions } = req.body;
  if (!name) throw new BadUserInput();
  let test = await Test.findById(testId);
  if (!test) throw new EntityNotFound("Test Not Found. The requested resource is not longer available");
  test.name = name;
  test.time_limit = time_limit;
  test.questions = questions;
  await test.save();
  test = await Test.findById(testId).populate("questions");
  return res.json({ message: "Test Updated successfully!", test, status: 200 });
});

module.exports.deleteTest = asyncCatch(async (req, res) => {
  let { testId } = req.body;
  if (!testId) throw new EntityNotFound("Test Not Found. The requested resource is not longer available");
  await Test.findByIdAndDelete(testId);
  let tests = await Test.find({});
  return res.json({ message: "Test Deleted successfully!", tests, status: 200 });
});

module.exports.getAllTest = asyncCatch(async (req, res) => {
  let tests = await Test.find({}).populate("questions");
  return res.json({ message: "Tests fetched successfully!", tests, status: 200 });
});

module.exports.getTestDetails = asyncCatch(async (req, res) => {
  let { testId } = req.body;
  let test = await Test.findById(testId).populate("questions");
  if (!testId) throw new EntityNotFound("Test Not Found. The requested resource is not longer available");
  return res.json({ message: "Tests fetched successfully!", test, status: 200 });
});

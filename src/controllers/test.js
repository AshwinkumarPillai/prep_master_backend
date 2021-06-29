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
  let test = await Test.findById(testId);
  test.status = "ARCHIVED";
  await test.save();
  let tests = await Test.find({});
  return res.json({ message: "Test archived successfully!", tests, status: 200 });
});

module.exports.restoreTest = asyncCatch(async (req, res) => {
  let { testId } = req.body;
  if (!testId) throw new EntityNotFound("Test Not Found. The requested resource is not longer available");
  let test = await Test.findById(testId);
  test.status = "PUBLISHED";
  await test.save();
  let tests = await Test.find({});
  return res.json({ message: "Test restored successfully!", tests, status: 200 });
});

module.exports.publishTest = asyncCatch(async (req, res) => {
  let { testId } = req.body;
  let test = await Test.findById(testId).populate("questions");
  if (!test) throw new EntityNotFound("Test Not Found. The requested resource is not longer available");
  test.status = "PUBLISHED";
  await test.save();
  return res.json({ message: "Tests published successfully!", test, status: 200 });
});

module.exports.getAllTest = asyncCatch(async (req, res) => {
  let tests = await Test.find({ status: "PUBLISHED" }).populate("questions", "-_id -correctOption -correctOptions -explanation");
  return res.json({ message: "Tests fetched successfully!", tests, status: 200 });
});

module.exports.getAllAdminTests = asyncCatch(async (req, res) => {
  let tests = await Test.find({ status: { $ne: "ARCHIVED" } }).populate("questions");
  return res.json({ message: "Tests fetched successfully!", tests, status: 200 });
});

module.exports.getTestDetails = asyncCatch(async (req, res) => {
  let { q } = req.query;
  let test = await Test.findById(q).populate("questions", "-correctOption -correctOptions -explanation");
  if (!test || test.status !== "PUBLISHED") throw new EntityNotFound("Test Not Found. The requested resource is not longer available");
  return res.json({ message: "Tests fetched successfully!", test, status: 200 });
});

module.exports.getFullTestDetails = asyncCatch(async (req, res) => {
  let { q } = req.query;
  let test = await Test.findById(q).populate("questions");
  if (!test) throw new EntityNotFound("Test Not Found. The requested resource is not longer available");
  return res.json({ message: "Tests fetched successfully!", test, status: 200 });
});

module.exports.getArchivedTests = asyncCatch(async (req, res) => {
  let tests = await Test.find({ status: "ARCHIVED" }).populate("questions");
  return res.json({ message: "Test fetched successfully!", tests, status: 200 });
});

module.exports.getArchivedTestDetails = asyncCatch(async (req, res) => {
  let { q } = req.query;
  let test = await Test.findById(q).populate("questions");
  if (!test) throw new EntityNotFound("Test Not Found. The requested resource is not longer available");
  return res.json({ message: "Tests fetched successfully!", test, status: 200 });
});

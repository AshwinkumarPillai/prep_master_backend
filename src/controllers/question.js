const Question = require("../models/question");

const asyncCatch = require("../middleware/async_catch").asyncCatch;
const { BadUserInput, EntityNotFound } = require("../utils/custom_error");

module.exports.addQuestion = asyncCatch(async (req, res) => {
  let { title, options, correctOption, explanation, multiCorrect, correctOptions } = req.body;
  options = JSON.parse(options);
  correctOptions = JSON.parse(correctOptions);
  if (!title || options.length == 0) throw new BadUserInput();
  let question = new Question({ title, options, multiCorrect, correctOption, correctOptions });
  if (explanation) question.explanation = explanation;
  let file = req.file;
  if (file) {
    let image = {
      data: file.buffer,
      contentType: file.mimetype,
    };
    question.image = image;
  }
  await question.save();
  return res.json({ message: "Question Created Successfully!", question, status: 200 });
});

module.exports.updateQuestion = asyncCatch(async (req, res) => {
  let { questionId, title, options, correctOption, explanation, multiCorrect, correctOptions } = req.body;
  options = JSON.parse(options);
  correctOptions = JSON.parse(correctOptions);
  if (!questionId) throw new EntityNotFound("Question Not Found. The requested resource is not longer available");
  if (!title || options.length == 0) throw new BadUserInput();
  let question = await Question.findById(questionId);
  question.title = title;
  question.options = options;
  question.correctOption = correctOption;
  question.correctOptions = correctOptions;
  question.multiCorrect = multiCorrect;
  if (explanation) question.explanation = explanation;
  let file = req.file;
  if (file) {
    let image = {
      data: file.buffer,
      contentType: file.mimetype,
    };
    question.image = image;
  }
  await question.save();
  return res.json({ message: "Question Updated Successfully!", question, status: 200 });
});

module.exports.deleteQuestion = asyncCatch(async (req, res) => {
  let { questionId } = req.body;
  if (!questionId) throw new EntityNotFound("Question Not Found. The requested resource is not longer available");
  await Question.findByIdAndDelete(questionId);
  return res.json({ message: "Question Deleted successfully!", status: 200 });
});

module.exports.searchQuestion = asyncCatch(async (req, res) => {
  let { q } = req.query;
  // let questions = await Question.find({ $text: { $search: q, $caseSensitive: false } });
  let questions = await Question.find({ title: { $regex: q, $options: "i" } });
  return res.json({ questions, status: 200 });
});

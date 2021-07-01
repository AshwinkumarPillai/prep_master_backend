const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Test = require("../models/test");
const UserTestHistory = require("../models/user_test_history");

const asyncCatch = require("../middleware/async_catch").asyncCatch;
const { BadUserInput, EntityNotFound } = require("../utils/custom_error");

module.exports.Register = asyncCatch(async (req, res) => {
  let { username, pwd } = req.body;
  if (!username || !pwd) throw new BadUserInput();
  let user = await User.findOne({ username });
  if (user) return res.status(400).json({ message: "User Name already exists. Try another username", status: 400 });
  const password = bcrypt.hashSync(pwd, 12);
  user = new User({ username, password });
  await user.save();
  return res.json({ message: "User created successfully!", user, status: 200 });
});

module.exports.Login = asyncCatch(async (req, res) => {
  let { username, pwd } = req.body;
  if (!username || !pwd) throw new BadUserInput();
  let user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "User name or password incorrect. Please try again!", status: 400 });
  let isEqual = bcrypt.compareSync(pwd, user.password);
  if (!isEqual) return res.status(401).json({ message: "User name or password incorrect. Please try again!", status: 400 });
  let token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_USER
  );
  user.token = token;
  await user.save();
  user.password = "";
  return res.json({ message: "Logged in successfully!", user, status: 200 });
});

function generateScore(questions, selectedOptionsMap) {
  let test_data = [];
  for (const [key, value] of selectedOptionsMap.entries()) {
    test_data.push({ questionId: key, selectedOptions: [...value] });
  }
  let score = 0;
  questions.forEach((question) => {
    let soptions = selectedOptionsMap.get(`${question._id}`);
    if (question.multiCorrect) {
      let allCorrect = true;
      if (question.correctOptions.length !== soptions.size) allCorrect = false;
      else {
        for (let x of question.correctOptions) {
          if (!soptions.has(x)) {
            allCorrect = false;
            break;
          }
        }
      }
      if (allCorrect) score++;
    } else {
      if (soptions.has(question.correctOption)) score++;
    }
  });

  return [score, test_data];
}

function getMapFromObj(obj) {
  let map = new Map();
  for (let key in obj) {
    map.set(key, new Set(obj[key]));
  }
  return map;
}

module.exports.saveUserTestHistory = asyncCatch(async (req, res) => {
  let { userId, testId, selectedOptionsMap } = req.body;
  selectedOptionsMap = getMapFromObj(selectedOptionsMap);
  if (!userId || !testId) throw new BadUserInput("Error needed Id's empty");
  let test = await Test.findById(testId).populate("questions");
  if (!test) throw new EntityNotFound();
  let [score, test_data] = generateScore(test.questions, selectedOptionsMap);
  let user = await User.findById(userId);
  let userTestHistory = null;
  if (user) {
    userTestHistory = new UserTestHistory({ userId, testId, score, test_data });
    await userTestHistory.save();
  }
  let userTestHistoryId = userTestHistory ? userTestHistory._id : null;
  return res.json({ message: "Test Saved Successfully!", userTestHistoryId, status: 200 });
});

module.exports.fetchUserTestHistory = asyncCatch(async (req, res) => {
  let { userId, testId, userTestHistoryId } = req.body;
  let userTestHistory;
  if (userTestHistoryId) {
    userTestHistory = await UserTestHistory.findById(userTestHistoryId).populate("testId test_data.questionId");
    if (!userTestHistory) {
      userTestHistory = await UserTestHistory.findOne({ userId, testId }).populate("testId test_data.questionId");
    }
  } else {
    if (!userId || !testId) throw new BadUserInput("Error needed Id's empty");
    userTestHistory = await UserTestHistory.findOne({ userId, testId }).populate("testId test_data.questionId");
  }
  return res.json({ message: "Data Fetched Successfully!", userTestHistory, status: 200 });
});

module.exports.fetchAllUserTestHistory = asyncCatch(async (req, res) => {
  let { userId, testId } = req.body;
  if (!userId || !testId) throw new BadUserInput("Error needed Id's empty");
  let userTestHistory = await UserTestHistory.find({ userId, testId }).populate("testId test_data.questionId");
  return res.json({ message: "Data Fetched Successfully!", userTestHistory, status: 200 });
});

module.exports.fetchUserHistory = asyncCatch(async (req, res) => {
  let userId = req.user._id;
  if (!userId) throw new BadUserInput("Error needed Id's empty");
  let userHistory = await UserTestHistory.find({ userId }).populate("testId").sort({ createdAt: -1 });
  return res.json({ message: "Data Fetched Successfully!", userHistory, status: 200 });
});

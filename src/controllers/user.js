const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const asyncCatch = require("../middleware/async_catch").asyncCatch;
const { BadUserInput } = require("../utils/custom_error");

module.exports.Register = asyncCatch(async (req, res) => {
  let { username, pwd } = req.body;
  if (!username || !pwd) throw new BadUserInput();
  let user = await User.findOne({ username });
  if (user) return res.json({ message: "User Name already exists. Try another username", status: 400 });
  const password = bcrypt.hashSync(pwd, 12);
  user = new User({ username, password });
  await user.save();
  return res.json({ message: "User created successfully!", user, status: 200 });
});

module.exports.Login = asyncCatch(async (req, res) => {
  let { username, pwd } = req.body;
  if (!username || !pwd) throw new BadUserInput();
  let user = await User.findOne({ username });
  if (!user) return res.json({ message: "User name or password incorrect. Please try again!", status: 400 });
  let isEqual = bcrypt.compareSync(pwd, user.password);
  if (!isEqual) return res.json({ message: "User name or password incorrect. Please try again!", status: 400 });
  let token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_USER
  );
  user.token = token;
  await user.save();
  return res.json({ message: "Logged in successfully!", user, status: 200 });
});

const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const asyncCatch = require("../middleware/async_catch").asyncCatch;
const { BadUserInput } = require("../utils/custom_error");

module.exports.Login = asyncCatch(async (req, res) => {
  let { username, pwd } = req.body;
  if (!username || !pwd) throw new BadUserInput();
  let user = await Admin.findOne({ username });
  if (!user) return res.json({ message: "User name or password incorrect. Please try again!", status: 400 });
  let isEqual = bcrypt.compareSync(pwd, user.password);
  if (!isEqual) return res.json({ message: "User name or password incorrect. Please try again!", status: 400 });
  let token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_ADMIN
  );
  user.token = token;
  await user.save();
  user.password = "";
  return res.json({ message: "Logged in successfully!", user, token, status: 200 });
});

module.exports.checkAdmin = async (req, res) => {
  try {
    const token = req.headers["x-auth"];
    const secret = process.env.JWT_SECRET_ADMIN;
    let decoded_token = jwt.verify(token, secret);
    let user = await Admin.findById(decoded_token.id);
    if (!user) return res.status(401).json({ message: "Authorization Error Please login again", status: 401 });
    return res.json({ message: "Authenticated", status: 200 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", status: 200 });
  }
};

// kuttanAdmin_123$

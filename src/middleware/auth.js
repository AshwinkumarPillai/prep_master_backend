const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require("../models/user");

module.exports.checkAdmin = async (req, res, next) => {
  const token = req.headers["x-auth"];
  const secret = process.env.JWT_SECRET_ADMIN;
  let decoded_token = jwt.verify(token, secret);
  let user = await Admin.findById(decoded_token.id);
  if (!user) return res.status(401).json({ message: "Authorization Error Please login again", status: 401 });
  req.user = user;
  return next();
};

module.exports.checkUser = async (req, res, next) => {
  const token = req.headers["x-auth"];
  const secret = process.env.JWT_SECRET_USER;
  let decoded_token = jwt.verify(token, secret);
  let user = await User.findById(decoded_token.id);
  if (!user) return res.status(401).json({ message: "Authorization Error Please login again", status: 401 });
  req.user = user;
  return next();
};

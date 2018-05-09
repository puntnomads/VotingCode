const jwt = require("jsonwebtoken"),
  crypto = require("crypto"),
  User = require("../models/user"),
  config = require("../config/main");

const generateToken = user => {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080
  });
};

const setUserInfo = request => {
  return {
    _id: request._id,
    name: request.name,
    email: request.email
  };
};

exports.login = (req, res, next) => {
  let userInfo = setUserInfo(req.user);
  res.status(200).json({
    token: "JWT " + generateToken(userInfo),
    ttl: 10080,
    created: new Date().toISOString(),
    name: userInfo.name
  });
};

exports.register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(422).send({ error: "Please provide all details." });
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(422)
      .send({ error: "That email address is already in use." });
  }
  const user = new User(req.body);
  const newUser = await user.save();
  let userInfo = setUserInfo(user);
  res.status(201).json({
    token: generateToken(userInfo),
    user: userInfo
  });
};

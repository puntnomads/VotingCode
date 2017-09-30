const jwt = require("jsonwebtoken"),
  crypto = require("crypto"),
  User = require("../models/user"),
  config = require("../config/main");

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080
  });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    name: request.name,
    email: request.email,
  };
}

  exports.login = function(req, res, next) {
    let userInfo = setUserInfo(req.user);

    res.status(200).json({
      token: generateToken(userInfo),
      user: userInfo
    });
  }

  exports.register = function(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name) {
      return res.status(422).send({ error: 'You must enter your full name.'});
    }

    if (!email) {
      return res.status(422).send({ error: 'You must enter an email address.'});
    }

    if (!password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }
        if (existingUser) {
          return res.status(422).send({ error: 'That email address is already in use.' });
        }

        let user = new User({
          name: name,
          email: email,
          password: password,
        });

        user.save(function(err, user) {
          if (err) { return next(err); }

          let userInfo = setUserInfo(user);

          res.status(201).json({
            token: generateToken(userInfo),
            user: userInfo
          });
        });
    });
  };

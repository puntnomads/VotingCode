const express = require('express');
/* eslint-disable */
const router = express.Router();
/* eslint-enable */
const passport = require('passport');
const User = require('../models/user');
const Verify = require('./verify');

router.get('/', function(req, res) {
  res.json({message: 'API Initialized!'});
});

router.post('/register', function(req, res) {
  User.register(new User({email: req.body.email, name: req.body.name}),
  req.body.password, function(err, user) {
    if (err) {
      return res.status(500).json({err: err});
    }
    user.save(function(err, user) {
        passport.authenticate('local')(req, res, function() {
           return res.status(200).json({status: 'Registration Successful'});
        });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info,
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user',
        });
      }

      const token = Verify.getToken(user);

      res.status(200).json({
        status: 'Login successful',
        success: true,
        user_id: user._id,
        token: token,
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!',
  });
});

module.exports = router;

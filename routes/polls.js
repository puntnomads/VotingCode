const express = require('express');
const bodyParser = require('body-parser');

const Poll = require('../models/poll');
const Verify = require('./verify');

const pollRouter = express.Router();
pollRouter.use(bodyParser.json());

pollRouter.route('/')
.get(function(req, res, next) {
  Poll.find(function(err, polls) {
      if (err) {
        res.send(err);
      }
      res.json(polls);
    });
})
.post(Verify.verifyUser, function(req, res, next) {
    const poll = new Poll();
    poll.user_id = req.body.user_id;
    poll.name = req.body.name;
    poll.options = req.body.options;

    poll.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Poll successfully added!'});
    });
});

pollRouter.route('/:poll_id')
.get(Verify.verifyUser, function(req, res, next) {
  Poll.findById(req.params.poll_id, function(err, poll) {
  if (err) throw err;
  res.json(poll);
});
})
.put(Verify.verifyUser, function(req, res, next) {
  Poll.findById(req.params.poll_id, function(err, poll) {
     if (err) {
       res.send(err);
     }
     poll.options = poll.options.concat(req.body.options);
     poll.save(function(err) {
       if (err) {
         res.send(err);
       }
       res.json({message: 'Poll has been updated'});
     });
   });
})
.delete(Verify.verifyUser, function(req, res, next) {
  Poll.remove({_id: req.params.poll_id}, function(err, poll) {
     if (err) {
       res.send(err);
     }
     res.json({message: 'Poll has been deleted'});
   });
});

module.exports = pollRouter;

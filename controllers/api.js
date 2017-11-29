const Poll = require("../models/poll"),
  config = require("../config/main");

exports.getPolls = function(req, res, next) {
  Poll.find({}, function(err, polls) {
    if (err) throw err;
    res.status(201).json(polls);
  });
};

exports.getUserPolls = function(req, res, next) {
  const name = req.params.name;
  Poll.find({ name: name }, function(err, polls) {
    if (err) throw err;
    res.status(201).json(polls);
  });
};

exports.createAPoll = function(req, res, next) {
  console.log(req.body);
  const name = req.body.name;
  const title = req.body.title;
  const tags = req.body.tags;
  const options = req.body.options;
  let poll = new Poll({
    name: name,
    title: title,
    tags: tags,
    options: options
  });
  poll.save(function(err, poll) {
    if (err) {
      return next(err);
    }
    res.status(201).json(poll);
  });
};

exports.getAPoll = function(req, res, next) {
  const id = req.params.id;
  Poll.find({ _id: id }, function(err, poll) {
    if (err) throw err;
    res.status(201).json(poll);
  });
};

exports.updateAPoll = function(req, res, next) {
  const id = req.params.id;
  const options = req.body.options;
  Poll.findOne({ _id: id }, function(err, poll) {
    if (err) throw err;
    poll.options = options;
    poll.save(function(err, poll) {
      if (err) throw err;
      res.status(201).json(poll);
    });
  });
};

exports.deleteAPoll = function(req, res, next) {
  const id = req.params.id;
  Poll.findOneAndRemove({ _id: id }, function(err, poll) {
    if (err) throw err;
    res.status(201).json(poll);
  });
};

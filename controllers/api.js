const Poll = require("../models/poll"),
  config = require("../config/main");

exports.getPolls = async (req, res, next) => {
  const polls = await Poll.find({});
  res.json({ polls: polls });
};

exports.getUserPolls = async (req, res, next) => {
  const userPolls = await Poll.find({ name: req.params.name });
  res.json({ userPolls: userPolls });
};

exports.createAPoll = async (req, res, next) => {
  const poll = new Poll(req.body);
  let newPoll = await poll.save();
  res.json({ poll: newPoll });
};

exports.getAPoll = async (req, res, next) => {
  const id = req.params.id;
  const poll = await Poll.findOne({ _id: id });
  res.json({ poll: poll });
};

exports.updateAPoll = async (req, res, next) => {
  const poll = await Poll.findOneAndUpdate({ _id: req.params.id }, req.body);
  res.json({ poll: poll });
};

exports.deleteAPoll = async (req, res, next) => {
  const poll = await Poll.findOneAndRemove({ _id: req.params.id });
  res.json({ poll: poll });
};

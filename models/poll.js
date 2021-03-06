const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tags: {type: [String], required: true},
  options: [[]],
});

module.exports = mongoose.model('Poll', Poll);

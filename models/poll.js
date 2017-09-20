const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
  user_id: String,
  title: String,
  tags: [],
  options: [],
});

module.exports = mongoose.model('Poll', Poll);

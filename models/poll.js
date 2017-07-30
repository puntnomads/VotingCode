const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
  user_id: String,
  name: String,
  options: [],
});

module.exports = mongoose.model('Poll', Poll);

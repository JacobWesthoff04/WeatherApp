const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nameF:      String,
  nameL:      String,
  _id:        String, //email
  password:   String,
  startDate:  {type: Date, default: Date.now },
  lastLogin:  {type: Date}
});

module.exports = mongoose.model('User', UserSchema)
/** @format */

const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const UserSchema = new Schema({
  telephoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  point: Number,
});

module.exports = mongoose.model("user", UserSchema);

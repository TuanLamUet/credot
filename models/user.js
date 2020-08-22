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
  },
  role: {
    type: String,
    default: "user",
  },
  point: {
    default: 0,
    type: String,
  },
});

module.exports = mongoose.model("user", UserSchema);

/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone: {
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
  title: {
    type: String
  },
  name: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("user", UserSchema);
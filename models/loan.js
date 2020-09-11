/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoanSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  bankId: {
    type: String,
    required: true
  },
  loanPackageId: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("loan", LoanSchema);
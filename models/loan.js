/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoanSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  money: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'chờ duyệt'
  },
  listLoan: [{
    nameLoanPackage: {
      type: String,
      required: true,
    },
    amountFrom: {
      type: String,
      required: true,
    },
    amountTo: {
      type: String,
      required: true
    },
    percentRate: {
      type: String,
      required: true,
    },
    period: {
      type: String,
    }

  }, ],
}, {
  timestamps: true,
});

module.exports = mongoose.model("loan", LoanSchema);
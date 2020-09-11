/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BankSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  logo: {
    type: String,
    default: "https://miro.medium.com/max/6000/1*uZyt9Z189siaNsAlIDtjEg.jpeg",
  },
  listSuggest: [{
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

  }, ],
}, {
  timestamps: true,
});

module.exports = mongoose.model("bank", BankSchema);
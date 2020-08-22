/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const BankSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  listSuggest: [
    {
      nameLoanPackage: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      percentRate: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("bank", BankSchema);

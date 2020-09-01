/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BankSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalMoney: {
      type: Number,
      required: true
    },
    logo: {
      type: String,
      default: "https://miro.medium.com/max/6000/1*uZyt9Z189siaNsAlIDtjEg.jpeg",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bank", BankSchema);

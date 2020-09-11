/** @format */

const Bank = require("../models/bank");
const {
  findOneAndUpdate
} = require("../models/bank");
const shortId = require("shortid");

const getAllBank = async (req, res) => {
  const listBank = await Bank.find();
  return res.status(200).json(listBank);
};

const getBankFilterByUser = (req, res) => {};
const createNewBank = async (req, res) => {
  const {
    name,
    logo,
    nameLoanPackage,
    value,
    percentRate,
    description,
  } = req.body;
  try {
    let bank = await Bank.findOne({
      name
    });

    if (bank) {
      return res.status(400).json({
        message: "This bank is exists"
      });
    }

    bank = new Bank({
      name,
      logo,
      listSuggest: [{
        loanPackageId: shortId.generate(),
        nameLoanPackage,
        value,
        percentRate,
        description
      }],
    });
    await bank.save();
    return res.status(201).json(bank);
  } catch (err) {
    res.json(500).json(err);
  }
};

const addNewLoanPackageToBank = async (req, res) => {
  const {
    name,
    nameLoanPackage,
    value,
    percentRate,
    description
  } = req.body;
  try {
    const bank = await Bank.findOne({
      name
    });
    if (!bank) {
      return res.status(400).json({
        message: "This bank do not exists"
      });
    }
    const listSuggest = {
      loanPackageId: shortId.generate(),
      nameLoanPackage,
      value,
      percentRate,
      description
    };
    bank.listSuggest.unshift(listSuggest)
    console.log(bank);
    await bank.save()
    return res.status(200).json(bank);
  } catch (err) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};
module.exports = {
  getAllBank,
  getBankFilterByUser,
  createNewBank,
  addNewLoanPackageToBank,
};
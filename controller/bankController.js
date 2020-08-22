/** @format */

const auth = require("../middleware/auth");
const Bank = require("../models/bank");

const getAllBank = async (req, res) => {
  const listBank = await Bank.find();
  return res.status(200).json(listBank);
};

const getBankFilterByUser = (req, res) => {};
const createNewBank = async (req, res) => {
  const {
    name,
    logo,
    nameLoadPackage,
    value,
    percentRate,
    description,
  } = req.body;
  let bank = await Bank.findOne({ name });

  if (bank) {
    return res.status(400).json({ message: "This bank is exists" });
  }

  bank = new Bank({
    name,
    logo,
    "listSuggest.nameLoanPackage": nameLoadPackage,
    "listSuggest.value": value,
    "listSuggest.percentRate": percentRate,
    "listSuggest.value": value,
  });
};

const addNewLoanPackageToBank = async (req, res) => {};
module.exports = {
  getAllBank,
  getBankFilterByUser,
  createNewBank,
  addNewLoanPackageToBank,
};

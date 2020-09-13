/** @format */

const Bank = require("../models/bank");
const shortId = require("shortid");

const getAllBank = async (_req, res) => {
  const listBank = await Bank.find();
  return res.status(200).json({
    status: true,
    message: "success",
    data: listBank
  });
};

const getBankFilterByUser = (req, res) => {};
const createNewBank = async (req, res) => {
  const {
    name,
    logo,
    nameLoanPackage,
    amountFrom,
    amountTo,
    percentRate,
    period
  } = req.body;
  try {
    let bank = await Bank.findOne({
      name
    });

    if (bank) {
      return res.status(400).json({
        message: "Ngân hàng này đã tồn tại"
      });
    }

    bank = new Bank({
      name,
      logo,
      listSuggest: [{
        nameLoanPackage,
        amountFrom,
        amountTo,
        percentRate,
        period
      }],
    });
    await bank.save();
    return res.status(201).json(bank);
  } catch (err) {
    console.log(err)
    res.json(500).json({
      status: false,
      message: "server error"
    });
  }
};

const addNewLoanPackageToBank = async (req, res) => {
  const {
    name,
    nameLoanPackage,
    amountFrom,
    amountTo,
    percentRate,
    period
  } = req.body;
  try {
    const bank = await Bank.findOne({
      name
    });
    if (!bank) {
      return res.status(400).json({
        status: false,
        message: "Ngân hàng này không tồn tại"
      });
    }
    const listSuggest = {
      nameLoanPackage,
      amountFrom,
      amountTo,
      percentRate,
      period
    };
    bank.listSuggest.unshift(listSuggest)
    console.log(bank);
    await bank.save()
    return res.status(200).json(bank);
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: false,
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
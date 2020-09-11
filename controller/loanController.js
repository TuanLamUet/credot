const Loan = require("../models/loan");

const createNewRequestLoan = async (req, res) => {
  const {
    bankId,
    loanPackageId
  } = req.body
  try {
    const requestLoan = Loan.findById(bankId)
    if (requestLoan) {
      console.log(requestLoan)
    }
    const newRequestLoan = new Loan({
      userId: req.user.id,
      bankId,
      loanPackageId
    })
    await newRequestLoan.save()
  } catch (err) {
    return res.status(500).json({
      message: "server error"
    })
  }
};

const listRequestLoan = async (req, res) => {
  try {
    const loanPackages = await Loan.find();
    if (loanPackages) {
      return res.status(200).json(request);
    }
  } catch (err) {
    return res.status(500).json({
      message: "server error"
    })
  }
};

const listRequestLoanUser = async (req, res) => {
  try {
    const request = await Loan.find({
      userId: req.user.id
    });

    // [{bankId, packageId}]
    const listBank
    if (request) {
      return res.status(200).json(request);

    }
  } catch (err) {
    return res.status(500).json({
      message: "server error"
    })
  }
};
module.exports = {
  listRequestLoan,
  createNewRequestLoan,
  listRequestLoanUser
};
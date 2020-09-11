const Loan = require("../models/loan");
const bank = require("../models/bank");

const createNewRequestLoan = async (req, res) => {
  const {
    bankId,
    loanPackageId
  } = req.body
  try {
    const newRequestLoan = new Loan({
      userId: req.user.id,
      bankId,
      loanPackageId
    })
    await newRequestLoan.save()
    return res.status(201).json(newRequestLoan)
  } catch (err) {
    return res.status(500).json({
      message: "server error"
    })
  }
};

const listRequestLoan = async (req, res) => {
  try {
    const loanPackages = await Loan.find({
      userId: req.user.id
    });
    const loans = []
    if (loanPackages) {

      for (const loan of loanPackages) {
        const aBank = await bank.findById(loan.bankId)

        loans.push(...aBank.listSuggest.filter(item => {
          console.log(item._id)
          console.log(loan.loanPackageId)
          if (item._id == loan.loanPackageId) {
            return item
          }
        }))
      }
      return res.status(200).json(loans);
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
};
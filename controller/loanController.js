const Loan = require("../models/loan");
const bank = require("../models/bank");

const createNewRequestLoan = async (req, res) => {
  const {
    bankId,
    loanPackageId,
    reason,
    money
  } = req.body

  try {

    let loan = null
    const aBank = await bank.findById(bankId)

    loan = aBank.listSuggest.filter(item => {
      if (item._id == loanPackageId) {
        return item
      }
    })
    if (loan) {

      console.log(0)
      console.log(loan[0])
      delete loan[0]._id
      console.log(1)
      console.log(loan[0])

      const newRequestLoan = new Loan({
        userId: req.user.id,
        reason,
        money
      })
      console.log(2)
      console.log(newRequestLoan)
      newRequestLoan.bankName = aBank.name
      newRequestLoan.listLoan.unshift(loan[0])
      console.log(3)
      console.log(newRequestLoan)
      await newRequestLoan.save()
      return res.status(201).json({
        status: true,
        data: newRequestLoan,
        message: "Gửi yêu cầu vay thành công"
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: false,
      message: "server error"
    })
  }
};

const listRequestLoan = async (req, res) => {
  try {
    const loanPackages = await Loan.find({
      userId: req.user.id
    });
    if (loanPackages) {

      return res.status(200).json({
        status: true,
        message: "success",
        data: loanPackages
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: false,
      message: "server error"
    })
  }
};

const getRequestLoanByBank = async (_req, res) => {
  try {
    const bankId = '5f623256e18012ecfb9921e9'
    const loanPackages = await Loan.find({
      bankId: bankId
    });
    if (loanPackages) {

      return res.status(200).json({
        status: true,
        message: "success",
        data: loanPackages
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: "server error"
    })
  }
}

module.exports = {
  listRequestLoan,
  createNewRequestLoan,
  getRequestLoanByBank
};
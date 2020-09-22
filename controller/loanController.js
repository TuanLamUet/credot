const Loan = require("../models/loan");
const bank = require("../models/bank");
const User = require("../models/user");

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

      delete loan[0]._id


      const newRequestLoan = new Loan({
        userId: req.user.id,
        bankId,
        reason,
        money
      })
      newRequestLoan.bankName = aBank.name
      newRequestLoan.listLoan.unshift(loan[0])
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
    const bankId = process.env.BANKID;
    const loanPackages = await Loan.find({
      bankId: bankId
    }).sort({
      createdAt: 'DESC'
    })

    if (loanPackages) {
      const userInfo = []
      for (const loan of loanPackages) {

        userInfo.push(User.find({
          _id: loan.userId
        }).select("-password").sort({
          createdAt: 'DESC'
        }))

      }
      const listUser = await Promise.all(userInfo)

      const users = [];
      for (let user of listUser) {
        users.push(...user)
      }
      console.log(users)
      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          loan: loanPackages,
          user: users
        }
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

const updateStatusRequestByBank = async (req, res) => {
  try {

    //     const bankId = '5f5dd842812259997a923465'
    const loanPackage = await Loan.find({
      _id: req.body.loanId
    })
    console.log(req.body.loanId)
    const loanPromise = []
    if (loanPackage) {
      for (loan of loanPackage) {

        loan.status = 'Đã duyệt';

        loanPromise.push(loan.save())
      }
      await Promise.all(loanPromise)

      return res.status(200).json({
        status: true,
        message: "success",
        data: loanPackage
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
  getRequestLoanByBank,
  updateStatusRequestByBank
};

const Loan = require("../models/loan");

const createNewRequestLoad = async (req, res) => {
  const {bankId,loanPackageId } = req.body
  try {
    const newRequestLoan = new Loan({
      userId: req.user.id,
      bankId,
      loanPackageId
    }) 
    await newRequestLoan.save()
  } catch (err) {
    return res.status(500).json(err)
  }
};

const listRequestLoad = async (req, res) => {
  try {
    const request = await Loan.find({userId: req.user.id});
    return res.status(200).json(request);
  } catch (err) {
    return res.status(500).json({ message: "server error"})
  }
};
module.exports = {
  listRequestLoad,
  createNewRequestLoad
};

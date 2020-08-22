/** @format */

const User = require("../models/user");
const userInfo = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
  console.log(req.user);
};

module.exports = {
  userInfo,
};

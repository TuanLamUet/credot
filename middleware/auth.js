/** @format */

const jwt = require("jsonwebtoken");
const user = require("../models/user");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({
      msg: "Token không tồn tại"
    });
  }
  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          msg: "Token không hợp lệ"
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    console.error("something wrong with auth middleware");
    res.status(500).json({
      msg: "Server Error"
    });
  }
};
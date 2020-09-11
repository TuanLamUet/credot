/** @format */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validationResult
} = require("express-validator");
const User = require("../models/user");

const createNewUser = async (req, res) => {
  const {
    telephoneNumber,
    point,
    role
  } = req.body;

  try {
    let user = await User.findOne({
      telephoneNumber
    });

    if (user) {
      return res.status(400).json({
        errors: {
          msg: "User này đã tồn tại"
        }
      });
    }

    user = new User({
      telephoneNumber,
      point,
      role,
    });

    user.save()
    return res.status(201).json({
      message: 'Tạo tài khoản thành công'
    })
  } catch (error) {
    console.log(error)
  }
}


const register = async (req, res) => {

  const {
    telephoneNumber,
    password,
    rePassword,
  } = req.body;

  try {
    let user = await User.findOne({
      telephoneNumber
    });
    const salt = await bcrypt.genSalt(8);

    if (user && !!(password === rePassword)) {
      user.password = await bcrypt.hash(password, salt)
    }

    user.save()
    const userInfo = {
      id: user._id,
      telephoneNumber,
      role: user.role,
      point: user.point,
    };
    const payload = userInfo;

    jwt.sign(
      payload,
      process.env.JWT_SECRET, {
        expiresIn: "5 days"
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          user: payload,
          token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const {
    telephoneNumber,
    password
  } = req.body;
  try {
    const user = await User.findOne({
      telephoneNumber,
    });
    if (!user) {
      return res.status(400).json({
        errors: [{
          msg: "Invalid Credentials"
        }]
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [{
          msg: "Invalid Credentials"
        }]
      });
    }
    const userInfo = {
      id: user._id,
      telephoneNumber,
      role: user.role,
      point: user.point,
    };
    const payload = userInfo;

    jwt.sign(
      payload,
      process.env.JWT_SECRET, {
        expiresIn: "5 days"
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          user: payload,
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  register,
  login,
  createNewUser
};
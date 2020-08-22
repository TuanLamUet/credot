/** @format */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { telephoneNumber, password, rePassword, point, role } = req.body;

  try {
    let user = await User.findOne({ telephoneNumber });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      telephoneNumber,
      password,
      rePassword,
      point,
      role,
    });

    const salt = await bcrypt.genSalt(8);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const userInfo = {
      id: user._id,
      telephoneNumber,
      role: user.role,
      point: user.point,
    };
    const payload = userInfo;

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ user: payload, token });
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
    return res.status(400).json({ errors: errors.array() });
  }

  const { telephoneNumber, password } = req.body;
  try {
    const user = await User.findOne({
      telephoneNumber,
    });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
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
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
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
};

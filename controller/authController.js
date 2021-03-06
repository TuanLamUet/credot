/** @format */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const createNewUser = async (req, res) => {
  const {
    phone,
    point,
    role
  } = req.body;

  try {
    let user = await User.findOne({
      phone
    });

    if (user) {
      return res.status(400).json({
        errors: {
          msg: "User này đã tồn tại"
        }
      });
    }

    user = new User({
      phone,
      point: ficoConversion(point),
      role,
    });

    await user.save()
    return res.status(201).json({
      message: 'Tạo tài khoản thành công'
    })
  } catch (error) {
    console.log(error)
  }
}


const register = async (req, res) => {

  const {
    phone,
    password,
    name,
    dob,
    address
  } = req.body;

  try {
    let user = await User.findOne({
      phone
    });
    const salt = await bcrypt.genSalt(8);

    if (!user) {
      user = new User()
      user.point = 300
      user.role = "user"
      user.title = "Cần cải thiện"
    }
    user.phone = phone
    user.password = await bcrypt.hash(password, salt)
    user.name = name,
      user.dob = dob,
      user.address = address
    user.title = handleTitle(user.point)

    await user.save()
    const userInfo = {
      id: user._id,
      phone,
      role: user.role,
      point: user.point,
      address: user.address,
      dob: user.dob,
      name: user.name,
      title: user.title
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
          status: true,
          message: "Tạo tài khoản thành công",
          data: {
            user: payload,
            token
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      status: false,
      message: "server error"
    });
  }
};

const login = async (req, res) => {


  const {
    phone,
    password
  } = req.body;
  try {
    const user = await User.findOne({
      phone,
    });
    if (!user) {
      return res.status(400).json({
        status: false,
        messsage: "Tài khoản hoặc mật khẩu không chính xác"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        messsage: "Tài khoản hoặc mật khẩu không chính xác"
      });
    }
    const userInfo = {
      id: user._id,
      phone,
      role: user.role,
      point: user.point,
      title: user.title,
      address: user.address,
      dob: user.dob,
      name: user.name,
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
          status: true,
          message: "Đăng nhập thành công",
          data: {
            user: payload,
            token,
          }
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "server error"
    });
  }
};

const handleTitle = (point) => {
  if (point < 630 && point >= 300) {
    return 'Cần cải thiện'
  } else if (point >= 630 && point < 690) {
    return 'Trung bình'
  } else if (point >= 690 && point < 720) {
    return 'Tốt'
  } else {
    return 'Xuất sắc'
  }
}

const ficoConversion = (x)  => {
  if (x <= 1 && x >= 0.401) {
    let fico = (((x - 0.401) * 329) / 0.599) + 300
    fico - (329 - (629 - fico) * 2)
    return Math.ceil(fico)
  } else if (x <= 0.4 && x >= 0.292) {
    let fico = (((x - 0.292) * 59) / 0.108) + 630
    fico = fico - (59 - (689 - fico) * 2)
    return Math.ceil(fico)
  } else if (x <= 0.291 && x >= 0.238) {
    let fico = (((x - 0.238) * 29) / 0.053) + 690
    fico - (29 - (719 - fico) * 2)
    return Math.ceil(fico)
  } else if (x <= 0.237 && x >= 0) {
    let fico = (((x - 0) * 130) / 0.237) + 720
    fico - (130 - (850 - fico) * 2)
    return Math.ceil(fico)
  }
}

module.exports = {
  register,
  login,
  createNewUser
};
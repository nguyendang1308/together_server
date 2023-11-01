const User = require("../model/user");
var md5 = require("md5");

//JWT token secret
const jwt = require("jsonwebtoken");
const jwtSecret =
  "eaea48d61242c574c2ca331d47de60d1fa87ddfb9c8e832a30c583b02ded0ac1f31d54";

//Start auth service
//For authenciation
exports.register = async (req, res, next) => {
  const { email, password, fullname, gender, birthday } = req.body;
  try {
    await User.create({
      email,
      password: md5(password),
      fullname,
      gender,
      birthday,
    }).then((user) => {
      res.status(200).json({
        message: "Register successfully",
        user: user,
      });
    });
  } catch (err) {
    res.status(401).json({
      message: "User cannot register success",
      error: err.message,
    });
  }
};

//For login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //Check if not have account in database
  try {
    const user = await User.findOne({ email, password: md5(password) });
    if (!user) {
      res.status(401).json({
        message: "Failed",
        error: "Login not successfull",
      });
    } else {
      res.status(200).json({
        message: "Success",
        user: user,
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Have problem occurred",
      error: err.message,
    });
  }
};

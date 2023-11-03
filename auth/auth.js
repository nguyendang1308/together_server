const Account = require("../model/account");
const User = require("../model/user");
const crypto = require("crypto");

//Start auth service
exports.register = async (req, res, next) => {
  const { username, password, email, fullname, gender, birthday } = req.body;
  const randomID = new crypto.randomBytes(16).toString("hex");

  try {
    await Account.create({
      randomID,
      username,
      password,
    }).then(async (account) => {
      await User.create({
        idUser: account.idUser,
        email,
        fullname,
        gender,
        birthday,
      }).then((user) => {
        res.status(200).json({
          message: "Success",
          data: user,
        });
      });
    });
  } catch (err) {
    res.status(401).json({
      message: "Failed",
      data: err.message,
    });
  }
};

//For login
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  //Check if not have account in database
  try {
    const account = await Account.findOne({ username: username,password: password }).populate('idUser');
    const user = await User.findOne({idUser: account.idUser});
    if (!user) {
      res.status(401).json({
        message: "Failed",
        error: null,
      });
    } else {
      res.status(200).json({
        message: "Success",
        data: user,
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Have problem occurred",
      data: null,
    });
  }
};

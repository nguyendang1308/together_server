const User = require("../model/user");
const Account = require("../model/account");

//Search
exports.search = async (req, res, next) => {
  const { username } = req.body;
  const idUser = await Account.findOne({ username: username }).populate(
    "idUser"
  );
  const user = await User.findOne({ idUser: idUser.idUser });
  try {
    if (user != null) {
      res.status(200).json({
        message: "Success",
        data: user,
      });
    } else {
      res.status(401).json({
        message: "Failed",
        data: null,
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Failed",
      data: null,
    });
  }
};
//Add friend
exports.addfriend = async (req, res, next) => {
    const {idUserSource,idUserDes} = req.body;
    //Check if exist in list friend
    const userSource = await User.findOne({idUser: idUserSource})
    const userDest = await User.findOne({idUser: idUserDes});
    var isExist = false
    await User.findOne({idUser: idUserSource}).populate("friends").then(user => {
        user.friends.forEach((value) => {
            if(userDest.idUser == value.idUser){
                isExist = true;
            }
        })
    });
    if(isExist == false){
        //Update source ID
        await User.updateOne({idUser: idUserSource},{$push: {friends: userDest}});
        //Update destination ID
        await User.updateOne({idUser: idUserDes},{$push: {friends: userSource}});
        res.status(200).json({
            message: "Success",
        });
    }else{
        res.status(401).json({
            message: "Failed",
        });
    }
}

//Get list friend
exports.friends = async (req, res, next) => {
    const {idUser} = req.body;
    //get list friend
    await User.findOne({idUser: idUser}).populate('friends').then((data) => {
        res.status(200).json({
            message: "Success",
            data: data.friends
        });
    });
}

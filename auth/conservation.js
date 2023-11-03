const Conservation = require("../model/conversation");
const User = require("../model/user");

exports.conservations = async (req, res, next) => {
    const {sourceId,destId} = req.body;
    const conservations = await Conservation.findOne({idSource: sourceId,idDestination: destId}).populate('message');
    try{
        if (conservations.message != null) {
            res.status(200).json({
              message: "Success",
              data: conservations.message,
            });
          } else {
            res.status(401).json({
              message: "Failed",
              data: null,
            });
          }
    }catch(err){
        res.status(401).json({
            message: "Failed",
            data: null,
        });
    }
}

exports.message = async (req, res, next) => {
    const {sourceId,destId} = req.body;
    const conservations = await User.findOne({idUser: sourceId}).populate('conversation').then((value) => {
        value.conversation.forEach((data) => {
            if(data.destId == destId){
                console.log("Message: " + data.message);
            }
        })
    });
}
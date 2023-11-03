const express = require("express");
const app = express();
app.use(express.json());
const PORT = 5000;

//Constant model
const User = require("../Backend/model/user");
const Conversation = require("../Backend/model/conversation");
const Message = require("../Backend/model/message");
const Mongoose = require("mongoose");
//Connect database
const connectDB = require("./database");
const { conservations } = require("./auth/conservation");
connectDB();

//Exception
const server = app.listen(PORT, () => {
  console.log("Connected on port " + PORT);
});

process.on("unhandledRejection", (err) => {
  console.log("Have error happened: " + err.message);
  server.close(() => process.exit(1));
});

app.use("/api/auth", require("./auth/route"));
var client = {};
//Connect chat server
const io = require("socket.io")(3000);
io.on("connection", (socket) => {
  let message;
  //login
  socket.on("login", (id) => {
    client[id] = socket;
    message = id;
    console.log("Hello, User " + message);
  });
  socket.on("message", async (msg) => {
    console.log("Message: " + msg.message);
    //Create conversation and add message
    const checkExist = await Conversation.findOne({
      idSource: message,
      idDestination: msg.targetId,
    });
    console.log("Check exist: " + checkExist);
    if (checkExist != null) {
      const id = new Mongoose.Types.ObjectId();
      const messager = new Message({
        _id: id,
        idSource: message,
        idDestination: msg.targetId,
        message: msg.message,
      });
      await messager.save();
      await Conversation.updateOne(
        { idSource: message, idDestination: msg.targetId },
        {
          $push: {
            message: {
              _id: id,
              idSource: message,
              idDestination: msg.targetId,
              message: msg.message,
            },
          }
        }
      );
    } else {
      const id = new Mongoose.Types.ObjectId();
      const messager = new Message({
        _id: id,
        idSource: message,
        idDestination: msg.targetId,
        message: msg.message,
      });
      await messager.save();
      const conversation = new Conversation({
        idSource: message,
        idDestination: msg.targetId,
        message: [
          {
            _id: id,
            idSource: message,
            idDestination: msg.targetId,
            message: msg.message,
          }
        ]
      });
      conversation.save();
    }
    let targetId = msg.targetId;
    if (client[targetId]) client[targetId].emit("message", msg);
  });
  socket.on("disconnect", () => {
    delete client[socket.id];
  });
});

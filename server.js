const express = require("express");
const app = express();
app.use(express.json());
const PORT = 5000;

//Constant model
const User = require("../Backend/model/user");

//Connect database
const connectDB = require("./database");
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
io.on('connection',socket => {
  let message = socket.handshake.query.message;
  console.log('Hello, User ' + message);
  connectedSockets.add(message);
  //login
  socket.on("login",(id) => {
    client[id] = socket;
  });
  socket.on("message",(msg) => {
    let targetId = msg.targetId;
    if(client[targetId]) {
      //Check if conservation not exist

      const sourceConservation = 
      client[targetId].emit("message",msg)
    };
  });
  socket.on('disconnect', () => {
    connectedSockets.delete(message);
  });
});

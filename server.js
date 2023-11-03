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
  //login
  socket.on("login",(id) => {
    client[id] = socket;
    message = id;
    console.log('Hello, User ' + message);
  });
  socket.on("message",async (msg) => {
    console.log("Message: " + msg.message);
    let targetId = msg.targetId;
    if(client[targetId]) client[targetId].emit("message",msg);
  });
  socket.on('disconnect', () => {
  });
});

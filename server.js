const express = require("express");
const app = express();
app.use(express.json());
const PORT = 5000;

//Connect database
const connectDB = require("./database");
connectDB();

//Exception
const server = app.listen(PORT, () => console.log("Connected on port " + PORT));

process.on("unhandledRejection", (err) => {
  console.log("Have error happened: " + err.message);
  server.close(() => process.exit(1));
});

app.use("/api/auth", require("./auth/route"));

//Connect chat server
const http = require("http").createServer();
const io = require("socket.io")(http);
const Conversation = require("./model/conversation")
var clients = {};

io.on("connection", (socket) => {
    console.log("User connected ",socket.id);
    // Listen for incoming chat messages
    socket.on('signin',(id) => {
        clients[id] = socket;
        console.log(clients);
    });
    socket.on("message",(data) => {
        console.log('Received message: ',data);
        const sourceID = data.sourceID;
        const destinationID = data.destinationID;
        const mess = data.message;
        clients[destinationID].emit("message",mess);
        Conversation
    });
});

http.listen(3000,(err) => {
    if(err) console.log(err);
})

//Connect database through Mongoose

const Mongoose = require("mongoose");
const localDB = 'mongodb://localhost:27017/chat_server'
const connectDB = async () => {
    await Mongoose.connect(localDB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("Database connect successfully")
}

module.exports = connectDB
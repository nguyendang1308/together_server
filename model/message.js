const Mongoose = require("mongoose")

const MessageSchema = new Mongoose.Schema({
    idSource: {
        type: String,
        required: true,
    },
    idDestination: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    time: {
        type: Date,
        default: () => new Date(),
    }
});

const Message = Mongoose.model("message",MessageSchema);
module.exports = Message
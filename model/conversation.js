const Mongoose = require("mongoose")
const message = require("./message")

const ConversationSchema = new Mongoose.Schema({
    idSource: {
        type: String,
    },
    idDestination: {
        type: String,
    },
    messages: [message],
    createDate: {
        type: Date,
    }
});

const Conversation = Mongoose.model("conservation",ConversationSchema);
module.exports = Conversation
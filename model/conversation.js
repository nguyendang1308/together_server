const Mongoose = require("mongoose")
const message = require("./message")

const ConversationSchema = new Mongoose.Schema({
    idRoom: {
        type: String,
        required: true,
    },
    idSource: {
        type: String,
        required: true,
    },
    idDestination: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: () => new Date(),
    }
});

const Conversation = Mongoose.model("conversation",ConversationSchema);
module.exports = Conversation
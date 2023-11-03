const Mongoose = require("mongoose")
const message = require("./message")

const ConversationSchema = new Mongoose.Schema({
    idSource: {
        type: String,
        required: true,
    },
    idDestination: {
        type: String,
        required: true,
    },
    message: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "message"
        }
    ],
    createDate: {
        type: Date,
        default: () => new Date(),
    }
});

const Conversation = Mongoose.model("conversation",ConversationSchema);
module.exports = Conversation
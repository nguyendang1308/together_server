const Mongoose = require("mongoose")

const UserSchema = new Mongoose.Schema({
    idUser: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    friends: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    conversation: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "conversation",
        }
    ],
    security: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "security",
    },
    blockUser: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "blockUser",
        }
    ],
})

const User = Mongoose.model("user",UserSchema);
module.exports = User
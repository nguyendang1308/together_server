const Mongoose = require("mongoose")
const crypto = require("crypto");

const UserSchema = new Mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: () => new crypto.randomBytes(16).toString("hex"),
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
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
        {}
    ],
    createdDate: {
        type: Date,
        default: () => new Date(),
    }
})

const User = Mongoose.model("user",UserSchema);
module.exports = User
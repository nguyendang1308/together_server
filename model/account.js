const Mongoose = require("mongoose")
const crypto = require("crypto");

const AccountSchema = new Mongoose.Schema({
    idUser: {
        type: String,
        unique: true,
        default: () => new crypto.randomBytes(16).toString("hex"),
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createDay: {
        type: Date,
        default: () => new Date(),
    },
});

const Account = Mongoose.model("account",AccountSchema);
module.exports = Account
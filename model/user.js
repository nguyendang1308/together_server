const Mongoose = require("mongoose")

const UserSchema = new Mongoose.Schema({
    idUser: {
        type: String,
        unique: true,
        default: () => new Date().toString(),
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
    createdDate: {
        type: Date,
        default: () => new Date(),
    }
})

const User = Mongoose.model("user",UserSchema);
module.exports = User
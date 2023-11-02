const Mongoose = require("mongoose")

const BlockUserSchema = new Mongoose.Schema({
    idUser: {
        type: String,
        unique: true,
    },
    idBlock: {
        type: String,
        unique: true,
    },
    createDay: {
        type: Date,
        default: () => new Date(),
    },
});

const BlockUser = Mongoose.model("blockUser",BlockUserSchema);
module.exports = BlockUser
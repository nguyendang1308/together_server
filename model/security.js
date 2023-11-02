const Mongoose = require("mongoose")

const SecuritySchema = new Mongoose.Schema({
    idUser: {
        type: String,
        unique: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    }
});

const Security = Mongoose.model("security",SecuritySchema);
module.exports = Security
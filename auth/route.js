const express = require("express")
const router = express.Router()
const {register, login} = require("./auth");
const {search , addfriend} = require("./user");
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/search").post(search)
router.route("/add").post(addfriend)
module.exports = router



const express = require("express")
const router = express.Router()
const {register, login} = require("./auth");
const {search , addfriend , friends} = require("./user");
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/search").post(search)
router.route("/add").post(addfriend)
router.route("/friends").post(friends)
module.exports = router



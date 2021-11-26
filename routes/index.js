// ./routes/index.js

const express	= require("express")
const router	= express.Router()

const indexController		= require("./../controllers/indexController")


router.get("/", indexController.home)
router.get("/login", indexController.login)
router.get("/signup", indexController.signup)

module.exports = router
// ./routes/index.js

const express	        = require("express")
const router	        = express.Router()
const routeGuard		= require("./../middlewares/route-guard")
const indexController	= require("./../controllers/indexController")


router.get("/", indexController.home)
router.get("/perfil", routeGuard.usuarioLoggeado, indexController.perfil)
router.get("/login", routeGuard.usuarioNoLoggeado, indexController.viewLogin)
router.get("/signup", routeGuard.usuarioNoLoggeado, indexController.viewSignup)
router.post("/signup", routeGuard.usuarioNoLoggeado, indexController.register)
router.post("/login", routeGuard.usuarioNoLoggeado, indexController.login)
router.get("/logout", routeGuard.usuarioLoggeado, indexController.logout)

module.exports = router
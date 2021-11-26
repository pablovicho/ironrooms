const bcryptjs = require("bcryptjs")
const User = require("./../models/User")

exports.home = async(req,res) => {
    res.render("home")
}

exports.viewLogin = async(req,res) => {
    res.render("login")
}

exports.viewSignup = async(req,res) => {
    res.render("signup")
}

exports.register = async (req, res) => {
	// 1. OBTENCIÓN DE DATOS DEL FORMULARIO
	const username 	= req.body.username
	const email 	= req.body.email
	const password 	= req.body.password

	// => A) VALIDACIÓN - VERIFICACIÓN DE CAMPOS VACÍOS
	if(!username || !email || !password){
		res.render("signup", {
			errorMessage: "Uno o más campos están vacíos. Revísalos nuevamente."
		})
		return
	}

	// => B) VALIDACIÓN - FORTALECIMIENTO DE PASSWORD
	const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
	if(!regex.test(password)){
		res.render("signup", {
			errorMessage: "Tu password debe de contener 6 caracteres, mínimo un número y una mayúscula."
		})		
		return
	}

	// 2. ENCRIPTACIÓN DE PASSWORD 🚩🚩🚩
	try {
		const salt = await bcryptjs.genSalt(10)
		const passwordEncriptado = await bcryptjs.hash(password, salt)
		const newUser = await User.create({
			username,
			email,
			passwordEncriptado
		}) 
		console.log(newUser)
		// 3. REDIRECCIÓN DE USUARIO
		res.redirect("/login")
	} catch (error) {
		console.log(error)
		res.status(500).render("signup", {
			errorMessage: "Hubo un error con la validez de tu correo. Intenta nuevamente. No dejes espacios y usa minúsculas."
		})
	}
}

exports.login = async (req, res) => {
	try {
	// 1. OBTENCIÓN DE DATOS DEL FORMULARIO
	const email = req.body.email
	const password = req.body.password
	// 2. VALIDACIÓN DE USUARIO ENCONTRADO EN BD
	const foundUser = await User.findOne({ email })
	if(!foundUser){
		res.render("login", {
			errorMessage: "Email o contraseña sin coincidencia."
		})
		return
	}
	// 3. VALIDACIÓN DE CONTRASEÑA
	const verifiedPass = await bcryptjs.compareSync(password, foundUser.passwordEncriptado)
	if(!verifiedPass){
		res.render("login", {
			errorMessage: "Email o contraseña errónea. Intenta nuevamente."
		})
		return
	}
	// PERSISTENCIA DE IDENTIDAD
	req.session.currentUser = {
		_id: foundUser._id,
		username: foundUser.username,
		email: foundUser.email,
		mensaje: "LO LOGRAMOS CARAJO"
	}
	// 5. REDIRECCIONAR AL HOME
	res.redirect("/users/profile")
	} catch (error) {
		console.log(error)	
	}
}
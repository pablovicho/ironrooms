// IMPORTACIONES
const express = require("express")
const app = express()


const hbs = require("hbs")
const connectDB = require("./config/db")
const sessionManager = require("./config/session")
require("dotenv").config()

// MIDDLEWARES
// LAYOUT MIDDLEWARE. para poder usar currentUser en layout
// app.use((req, res) => {
// 	res.locals.currentUser = req.session.currentUser
// 
// })
app.use(express.static("public"))
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")
sessionManager(app)
connectDB()
app.use(express.urlencoded({ extended: true })) //para trabajo de formularios
// RUTAS
app.use("/", require("./routes/index"))
app.use("/rooms", require("./routes/rooms"))
//app.use("/users", require("./routes/users"))
// SERVER
app.listen(process.env.PORT, () => {
    console.log(`servidor conectado en el puerto ${process.env.PORT}`)
})
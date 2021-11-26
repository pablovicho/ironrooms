// IMPORTACIONES
const express = require("express")
const app = express()

const hbs = require("hbs")
const connectDB = require("./config/db")

require("dotenv").config()

// MIDDLEWARES
app.use(express.static("public"))
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")
// RUTAS
app.use("/", require("./routes/index"))
// SERVER
app.listen(process.env.PORT, () => {
    console.log(`servidor conectado en el puerto ${process.env.PORT}`)
})
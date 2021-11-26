//importaciones
const mongoose = require("mongoose")


//schema
const roomSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    numberBeds: {
        type: Number
    },
    location: {
        type: String
    },
    photoUrl: {
        type: String
    }
})


//modelo
const Room = mongoose.model("Room", roomSchema)

//exportación
module.exports = Room
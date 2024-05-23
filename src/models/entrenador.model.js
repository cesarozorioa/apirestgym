const mongoose = require('mongoose')
const entrenadorScchema = new mongoose.Schema(
    {
        entId:Number,
        entIdUsuario:Number,
        entCaracteristicas:String,
        entDisponible:String,
        entSueldo:Number,       
               
    }
)
module.exports = mongoose.model('Entrenador',entrenadorScchema)
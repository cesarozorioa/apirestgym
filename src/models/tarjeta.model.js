const mongoose = require('mongoose')
const tarjetaScchema = new mongoose.Schema(
    {
        tarId:Number,
        tarIdMiembro:Number,
        tarNombre:String,
        tarFvence:String,
        tarCodigo:String
                  
    }
)

module.exports = mongoose.model('Tarjeta',tarjetaScchema)
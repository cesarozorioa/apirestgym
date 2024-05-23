const mongoose = require('mongoose')
const pagoScchema = new mongoose.Schema(
    {
        paId:Number,
        paIdUser:Number,
        paIdMembresia:Number,
        paIdTarjeta:String,
        paMonto:Number,
        paFecha:String,       
    }
)

module.exports = mongoose.model('Pago',pagoScchema)
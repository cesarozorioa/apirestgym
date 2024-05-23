const mongoose = require('mongoose')
const reservaScchema = new mongoose.Schema(
    {
        reId:Number,
        reIdMiembro:Number,
        reIdClase:Number,
        reIdHorario:Number,
        reFecha:String                  
    }
)
module.exports = mongoose.model('Reserva',reservaScchema)
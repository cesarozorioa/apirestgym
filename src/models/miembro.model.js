const mongoose = require('mongoose')
const miembroScchema = new mongoose.Schema(
    {
        mbId:Number,
        mbUsuario:Number,
        mbEstado:Number,
        mbFecha:String,
                    
    }
)

module.exports = mongoose.model('Miembro',miembroScchema)
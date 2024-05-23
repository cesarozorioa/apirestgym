const mongoose = require('mongoose')
const membresiaScchema = new mongoose.Schema(
    {
        msIdMembresia:Number,
        msIdTmembresia:Number,        
        msFechaIni:String,
        msFechaFin:String,
        msEstado:Boolean            
    }
)

module.exports = mongoose.model('Membresia',membresiaScchema)
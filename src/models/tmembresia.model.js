const mongoose = require('mongoose')
const tipoMembresiaScchema = new mongoose.Schema(
    {
        tmId:Number,
        tmNombre:String,
        tmValor:Number              
    }
)

module.exports = mongoose.model('Tipomembresia',tipoMembresiaScchema)
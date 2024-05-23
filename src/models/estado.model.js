const mongoose = require('mongoose')
const estadoScchema = new mongoose.Schema(
    {
        esId:Number,
        esNombre:String,
               
    }
)

module.exports = mongoose.model('Estado',estadoScchema)
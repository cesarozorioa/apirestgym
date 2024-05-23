const mongoose = require('mongoose')
const claseScchema = new mongoose.Schema(
    {
        clId:Number,
        clNombre:String,
        clDescribe:String,               
    }
)
module.exports = mongoose.model('Clase',claseScchema)
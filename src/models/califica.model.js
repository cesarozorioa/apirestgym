const mongoose = require('mongoose')
const calficaScchema = new mongoose.Schema(
    {
        calId:Number,
        calIdEntrenador:Number,
        calIdMiembro:Number,
        calNota:Number,
        calDescribe:String     
               
    }
)
module.exports = mongoose.model('Califica',calficaScchema)
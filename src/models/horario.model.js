const mongoose = require('mongoose')
const horarioScchema = new mongoose.Schema(
    {
        hoId:Number,
        hoDia:String,
        hoInicio:String,  
        hoFin:String            
    }
)
module.exports = mongoose.model('Horario',horarioScchema)
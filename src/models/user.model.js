const mongoose = require('mongoose')
const userScchema = new mongoose.Schema(
    {
        usId:Number,
        usNombre:String,
        usApellido:String,
        usPassword:String,
        usName:String,
        usIdRol:Number      
    }
)

module.exports = mongoose.model('User',userScchema)
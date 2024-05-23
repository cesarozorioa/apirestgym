const mongoose = require('mongoose')
const rolScchema = new mongoose.Schema(
    {
        rolId:Number,
        rolName:String,
              
    }
)

module.exports = mongoose.model('Rol',rolScchema)
// setp 3 creating schema for storing our data in mongodb
var mongoose = require("mongoose")
const ImgSchema = new mongoose.Schema({
    name:String,
    des:String,
    img:{
        data:Buffer,
        ContentType:String
    }
},{
    timestamps:true
})

module.exports = new mongoose.model("Image",ImgSchema);
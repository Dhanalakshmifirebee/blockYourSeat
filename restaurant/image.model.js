const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    image:String
},{
    collection:"imageSchema"
})


module.exports= mongoose.model("imageSchema",imageSchema)
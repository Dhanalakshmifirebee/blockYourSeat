const mongoose = require('mongoose')
const Schema = mongoose.Schema

const faqSchema = new Schema({
    question :String,
    answer:String,
    deleteFlag:{
        type:String,
        default:"false"
    }
},{
    collection:"FAQ"
})

module.exports = mongoose.model("FAQ",faqSchema)
const mongoose = require('mongoose');
const logincontrollers=require('./logincontrollers');
const Schema = mongoose.Schema;



let loginSchema = new Schema({
    restaurantName : String,
    username : String,
    contact : Number,
    email : String,
    password: String,
    role: {
        type: String, default: "admin"
    },
    userId: String
}, {
    collection: 'login'
})



module.exports = mongoose.model('LoginSchema', loginSchema)
const mongoose = require('mongoose');
const logincontrollers=require('./userscontrollers');
const Schema = mongoose.Schema;

let RegisterSchema = new Schema({
    username: String,
    email: String,
    phonenumber: Number,
    location: String,
    password: String
}, {
    collection: 'register'
})

module.exports = mongoose.model('RegisterSchema', RegisterSchema);
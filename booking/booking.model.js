const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
    restaurantName : String,
    userId : String,
    address : String,
    city : String,
    bookingTime : String,
    totalPeoples:{type:Number,default:0},
    bookingDate: String,
    reservePrice: Number,  
    created_date:{
        type:Date, default:Date
    },
}, {
    collection: 'booking'
})

module.exports = mongoose.model('bookingSchema', bookingSchema)
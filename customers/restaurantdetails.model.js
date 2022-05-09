const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let restaurantListSchema = new Schema({
    thumbnailImage: String,
    imageList: Array,
    restaurantName : String,
    owner : String,
    address : String,
    city : String,
    timing : String,
    contact : Number,
    status: {type:Boolean,default:false},
    userId: String,
    family:{type:Boolean,default:false},
    couple: {type:Boolean,default:false},
    ac:{type:Boolean,default:false},
    non_ac:{type:Boolean,default:false},
    veg:{type:Boolean,default:false},
    non_veg:{type:Boolean,default:false},
    totalBookingTimes:{type:Number,default:0},
    bookingShedule:Array,   
    created_date:{
        type:Date, default:Date
    },
}, {
    collection: 'restaurant'
})

module.exports = mongoose.model('restaurantListSchema', restaurantListSchema)
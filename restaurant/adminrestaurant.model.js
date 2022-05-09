const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let adminRestaurantSchema = new Schema({
    special: String,
    acprice: String,
    non_acprice: String,
    address: String,
    city: String,
    closetime: Date,
    contact: Number,
    coupletable: Number,
    familytable: Number,
    non_vegcombooffer: String,
    vegcombooffer: String,
    opentime: Date,
    serveravailable: Number,
    status: {type:Boolean,default:false},
    userId: String,
    family:{type:Boolean,default:false},
    couple: {type:Boolean,default:false},
    ac:{type:Boolean,default:false},
    non_ac:{type:Boolean,default:false},
    veg:{type:Boolean,default:false},
    non_veg:{type:Boolean,default:false},
    created:{type:Boolean,default:true},
    created_date:{
        type:Date, default:Date
    },
    rating:{
        type:Number,
        default:0
    }
}, {
    collection: 'restaurant'
})


module.exports = mongoose.model('adminRestaurantSchema', adminRestaurantSchema)
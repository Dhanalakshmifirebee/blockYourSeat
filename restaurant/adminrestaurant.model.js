const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let timeSchema = new Schema({
    time:String
})


let categorySchema = new Schema({
    categoryName:String
})


let adminRestaurantSchema = new Schema({
    restaurantName : String,
    thumbnailImage: String,
    imageList: Array,
    owner : String,
    email:String,
    address : String,
    restaurantAddress : String,
    restaurantLocation:{
        restaurantLatitude:Number,
        restaurantLongitude:Number
    },
    city : String,
    timing : String,
    contact : Number,
    adminId: String,
    family:{type:Boolean,default:false},
    couple: {type:Boolean,default:false},
    ac:{type:Boolean,default:false},
    non_ac:{type:Boolean,default:false},
    veg:{type:Boolean,default:false},
    non_veg:{type:Boolean,default:false},
    category:[categorySchema],
    totalBookingTimes:{type:Number,default:0},
    bookingShedule:[timeSchema],   
    special: String,
    acprice: String,
    non_acprice: String,
    coupletable: Number,
    familytable: Number,
    non_vegcombooffer: String,
    vegcombooffer: String,
    opentime: Date,
    closetime: Date,
    serveravailable: Number,
    website:String,
    features:[],
    diningOption:[],
    seatingOption:[],
    region:[],
    created:{type:Boolean,default:true},
    created_date:{
        type:Date, default:Date
    },
    rating:{
        type:Number,
        default:0
    },
    review:[Object],
    status:{
        type:String,
        default:"pending"
    }
}, {
    collection: 'restaurant'
})


module.exports = mongoose.model('adminRestaurantSchema', adminRestaurantSchema)




// address: String,
    // city: String,
    // closetime: Date,
    // contact: Number,
    // userId: String,
    // family:{type:Boolean,default:false},
    // couple: {type:Boolean,default:false},
    // ac:{type:Boolean,default:false},
    // non_ac:{type:Boolean,default:false},
    // veg:{type:Boolean,default:false},
    // non_veg:{type:Boolean,default:false},
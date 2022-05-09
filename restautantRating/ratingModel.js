const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reataurantRating = new Schema({
    userId:String,
    restaurantId:String,
    rating:{
        type:Number,
        default:0
    },
    noOfPersons:{
        type:Number,
        default:0
    }
},{
    collection:"RatingSchema"
})

module.exports=mongoose.model("RatingSchema",reataurantRating)

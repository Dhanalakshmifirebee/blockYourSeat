const mongoose = require('mongoose')
const Schema = mongoose.Schema


const restaurantReviewSchema = new Schema({
    restaurantId:String,
    userId:String,
    userName:String,
    command:String,
},{
    collection:"restaurantReview"
}
)
module.exports = mongoose.model("restaurantReviewSchema",restaurantReviewSchema)



const express=require('express');
const restaurantReviewController = require('./restaurantReviewController');

var restaurantReviewRouting=express.Router();

restaurantReviewRouting.route('/restaurantReview').post(restaurantReviewController.addReview)
restaurantReviewRouting.route('/getReviewList').get(restaurantReviewController.getReviewList)


 module.exports=restaurantReviewRouting
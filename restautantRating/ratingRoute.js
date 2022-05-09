const ratingController = require('./ratingController')
const express = require('express')
const ratingRouting = express.Router()

ratingRouting.route('/restaurantRating').post(ratingController.createReview)


module.exports = ratingRouting
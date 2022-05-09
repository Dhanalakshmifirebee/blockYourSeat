const express=require('express');
 const emailcontrollers=require('./emailcontrollers');

 var emailRouting=express.Router();

 emailRouting.route('/verify/:id/:token').get(emailcontrollers.getVerify);
 emailRouting.route('/sendemail').post(emailcontrollers.postMail);
//  emailRouting.route('/get-admin/:id').get(emailcontrollers.getId);
//  emailRouting.route('/createusers').post(emailcontrollers.createUsers);
//  emailRouting.route('/getrestaurant').get(emailcontrollers.getRestaurant);
//  emailRouting.route('/getbookingrestaurant/:id').get(emailcontrollers.getRestaurantBookingById);

module.exports=emailRouting;
const express=require('express');
 const logincontrollers=require('./userscontrollers');
 const valid = require('../Login/validation')

 var registerRouting=express.Router();

 registerRouting.route('/getAllUser').get(logincontrollers.getUsers);
 registerRouting.route('/login').post(logincontrollers.addUsers);
 registerRouting.route('/get-user/:id').get(logincontrollers.getId);
 registerRouting.route('/createusers').post(valid.validation,logincontrollers.createUsers);
 registerRouting.route('/getrestaurant').get(logincontrollers.getRestaurant);
 registerRouting.route('/getbookingrestaurant/:id').get(logincontrollers.getRestaurantBookingById);

module.exports=registerRouting;
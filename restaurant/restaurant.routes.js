const express=require('express');
 const restaurantcontrollers=require('./restaurantcontrollers');

 var restaurantRouting=express.Router();

 restaurantRouting.route('/getrestaurant').get(restaurantcontrollers.getRestaurant);
 restaurantRouting.route('/updatestatus').post(restaurantcontrollers.statusUpdate);
 restaurantRouting.route('/addrestaurant').post(restaurantcontrollers.addRestaurant);
 restaurantRouting.route('/getrestaurant/:id').get(restaurantcontrollers.getRestaurantById);
 restaurantRouting.route('/updaterestaurant').post(restaurantcontrollers.restaurantUpdate);
 restaurantRouting.route('/getadminrestaurant').get(restaurantcontrollers.getAdminRestaurant);
 restaurantRouting.route('/updateadminrestaurant').post(restaurantcontrollers.updateAdminRestaurant);
 restaurantRouting.route('/getadminrestaurant/:id').get(restaurantcontrollers.getAdminRestaurantById);
 restaurantRouting.route('/restauranttime').post(restaurantcontrollers.restaurantTimeUpate);

module.exports=restaurantRouting;
const express=require('express');
 const restaurantcontrollers=require('./restaurantcontrollers');

 const multer = require('../multer')

 var restaurantRouting=express.Router();

 restaurantRouting.route('/image').post(multer.upload.single("image"),restaurantcontrollers.addImage)
 restaurantRouting.route('/approvedRestaurant').post(restaurantcontrollers.approvedRestaurant)
 
 restaurantRouting.route('/getAllRestautant').get(restaurantcontrollers.getAllRestautant)
 restaurantRouting.route('/getrestaurant').get(restaurantcontrollers.getRestaurant);
 restaurantRouting.route('/updatestatus').post(restaurantcontrollers.statusUpdate);
 restaurantRouting.route('/addrestaurant').post(restaurantcontrollers.addRestaurant);
 restaurantRouting.route('/getrestaurant/:id').get(restaurantcontrollers.getRestaurantById);
 restaurantRouting.route('/updaterestaurant').post(restaurantcontrollers.restaurantUpdate);
 restaurantRouting.route('/getadminrestaurant').get(restaurantcontrollers.getAdminRestaurant);
 restaurantRouting.route('/updateadminrestaurant').post(restaurantcontrollers.updateAdminRestaurant);
 restaurantRouting.route('/getadminrestaurant/:id').get(restaurantcontrollers.getAdminRestaurantById);
 restaurantRouting.route('/restauranttime').post(restaurantcontrollers.restaurantTimeUpate);

restaurantRouting.route('/searchAPI').get(restaurantcontrollers.searchAPI)
restaurantRouting.route('/locationSearch/:key').get(restaurantcontrollers.locationSearch)
restaurantRouting.route('/filterRestaurant').get(restaurantcontrollers.filterRestaurant)
restaurantRouting.route('/filterRestaurantByOffer').get(restaurantcontrollers.filterRestaurantByOffer)
// restaurantRouting.route('/googleMap').post(restaurantcontrollers.googleMap)

module.exports=restaurantRouting;
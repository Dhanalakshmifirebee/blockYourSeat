const express=require('express');
 const bookingcontrollers=require('./bookingcontroller');

 var bookingRouting=express.Router();

 bookingRouting.route('/getbookings').get(bookingcontrollers.getBookingSlot);
//  bookingRouting.route('/login').post(logincontrollers.addUsers);
//  bookingRouting.route('/get-admin/:id').get(logincontrollers.getId);
 bookingRouting.route('/booking').post(bookingcontrollers.createBookingSlot);

module.exports=bookingRouting;
const express=require('express');
 const bookingcontrollers=require('./bookingcontroller');

 var bookingRouting=express.Router();

 bookingRouting.route('/getbookings').get(bookingcontrollers.getBookingSlot);
//  bookingRouting.route('/login').post(logincontrollers.addUsers);
//  bookingRouting.route('/get-admin/:id').get(logincontrollers.getId);
 bookingRouting.route('/booking').post(bookingcontrollers.createBookingSlot);
 bookingRouting.route('/deleteBooking/:id').delete(bookingcontrollers.removeBooking)

module.exports=bookingRouting;
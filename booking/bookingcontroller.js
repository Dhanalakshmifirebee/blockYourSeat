var jwtDecode = require('jwt-decode');
let booking = require('./booking.model');
let restaurant = require('../restaurant/adminrestaurant.model');

var createBookingSlot = function (req, response) {
    try {
        let token = req.headers.authorization;
        if(token != null){
        var decoded = jwtDecode(token);
        req.body.userId = decoded.userId;
        var bookingTable = new booking(req.body);
        bookingTable.save();
        response.status(200).json({ message: "Booking Successfully" ,bookingTable});
    }
    else {
        response.status(401).json({ message: "Unauthoraized" });
    }
    } catch (error) {
        response.status(500).send(error);
    }
}

var getBookingSlot = function (req, response) {
    try {
        let token = req.headers.authorization;
        if(token != null){
        var decoded = jwtDecode(token);
        booking.find({ userId: decoded.userId }, (err,data) => {
            if (err) throw err
            else{
                response.status(200).send(data);
            }
        })
    }
    else {
        response.status(401).json({ message: "Unauthoraized" });
    }
    } catch (error) {
        response.status(500).send(error);
    }
}

var removeBooking = (req,res)=>{
    try{
        booking.findOneAndDelete({_id:req.params.id},(err,data)=>{
            if(err){
                throw err
            }
            else{
                console.log(data)
                res.status(200).send({message:"deleted successfully",data})
            }
        })
    }
    catch(err){
        res.status(500).send(err)
    }
}




module.exports = {
    createBookingSlot: createBookingSlot,
    getBookingSlot: getBookingSlot,
    removeBooking:removeBooking
}
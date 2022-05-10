var jwtDecode = require('jwt-decode');
let getRestaurantDetails = require('./restaurant.model');
let LoginSchema = require('../Login/login.model');
let adminRestaurant = require('./adminrestaurant.model');
const nodeGeocoder = require('node-geocoder')
const nodemailer = require('nodemailer');
const { readdirSync } = require('fs');


var addRestaurant =async function (req, res) {
    let token = req.headers.authorization;
    if (token != null) {
        var decoded = jwtDecode(token);
        req.body['adminId'] = decoded.userId;
        let options = { provider: 'openstreetmap'}
        let geoCoder = nodeGeocoder(options);
        const convertAddressToLatLon=await(geoCoder.geocode(req.body.restaurantAddress))
        req.body.restaurantLocation = {"restaurantLatitude":convertAddressToLatLon[0].latitude,"restaurantLongitude":convertAddressToLatLon[0].longitude}
        const result1 = req.body.restaurantName.toLowerCase()
        req.body.restaurantName = result1
        const result2 = req.body.city.toLowerCase()
        req.body.city = result2
        console.log(req.body.restaurantName);
        console.log(req.body.city);
      
        adminRestaurant.create(req.body, (error, data) => {
            if (error) {
                throw error
            } else {
                res.json(data)
            }
        });
    }
    else {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
};


var getAllRestautant = (req,res)=>{
    try{
        adminRestaurant.find((err,data)=>{
            if(err){
                throw err
            }
            if(data.length<=0){
               return res.status(200).json({message:"No data found"})
            }
            else{
                res.status(400).send({message:data})
            }
        })
    }
    catch(err){
        res.status(500).send({message:err})
    }
}


var approvedRestaurant = (req,res)=>{
    try{
     adminRestaurant.findOne({_id:req.body.restaurantId},(err,data)=>{
         if(err){
             throw err
         }
         else{
             if(req.body.role=="accept"){
                const to = data.email
                postMail(to,"Block Your Seat","your restaurant is approved")
                adminRestaurant.findOneAndUpdate({_id:req.body.restaurantId},{$set:{status:"active"}},{new:true},(err,data)=>{
                    if(err){
                        throw err
                    }
                    else{
                        res.status(200).send({message:data})
                    }
                })
             }
             if(req.body.role=="reject"){
                const to = data.email
                postMail(to,"Block Your Seat","your restaurant is approved")
                adminRestaurant.findOneAndUpdate({_id:req.body.restaurantId},{$set:{status:"inActive"}},{new:true},(err,data)=>{
                    if(err){
                        throw err
                    }
                    else{
                        res.status(200).send({message:data})
                    }
                })
             }
         }
     })
    }
    catch(err){

    }
}


let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dhanamcse282@gmail.com',
        pass: 'dhanam282'
    }
})

let postMail = function ( to, subject, text) {
    transport.sendMail({
        from: 'dhanamcse282@gmail.com',
        to: to,
        subject: subject,
        text: text,
    })
}



var getRestaurant = function (req, res) {
    let token = req.headers.authorization;
    var decoded = jwtDecode(token);
    console.log(JSON.stringify(decoded.userId));
    adminRestaurant.find({status:"active"},(error, data) => {
        console.log(data)
        if (error) throw err
        if(data.length <= 0){
            return res.status(200).json(
                {message : "No data found"}
            );
        }
        else{
            if (JSON.stringify(decoded.userId) === JSON.stringify(data[0].adminId)) {
                return res.status(200).json(data);
            }
            else {
                res.status(401).json({
                    message: "Unauthorized"
                })
            }
        }
    })
}


var getRestaurantById = function (req, res) {
    let token = req.headers.authorization;
    if(token != null){
    var decoded = jwtDecode(token);
    adminRestaurant.findById(req.params.id, (error, data) => {
        if (error) throw err
        if(data.length <= 0){
            return res.status(200).json(
                {message : "No data found"}
            );
        }
        else {
            if (decoded.userId === data.userId) {
                res.status(200).json(data);
            }
            else {
                res.status(200).json({
                    message: "No data found"
                })
            }
        }
    })
}
else {
    res.status(401).json({
        message: "Unauthorized"
    })
}
}

var updateAdminRestaurant = function (req, res) {
    let token = req.headers.authorization;
    if(token != null){
    var decoded = jwtDecode(token);
    console.log(decoded);
    getRestaurantDetails.findById(req.body._id, (error, data) => {
        console.log(data);
        if (error) throw err
        LoginSchema.findById(decoded.userId, (err, data) => {
            console.log(data);
            if (err) {
                return next(err)
            }
            console.log(req.body._id);
            if (data) {
                adminRestaurant.findByIdAndUpdate(req.body._id, { $set: req.body },{new:true}, (err, response) => {
                   console.log(response)
                    if (err) {
                        return next(err)
                    } else {
                        res.json(response)
                    }
                })
            }
            else {
                res.status(200).json({
                    message: "No data found"
                })
            }
        });
    });
}
else {
    res.status(401).json({
        message: "Unauthorized"
    })
}
};


var getAdminRestaurant = function (req, res, next) {
    let token = req.headers.authorization;
    var restaurant;
    if (token != null) {
        var decoded = jwtDecode(token);
        LoginSchema.find({role:"admin"}, (err, data) => {
            if (err) throw ErrorEvent
            data = data.filter(res => JSON.stringify(res._id) === JSON.stringify(decoded.userId));
            getRestaurantDetails.find((err, response) => {
                if (err) {
                    return next(err)
                }
                data.forEach(async ele => {
                  restaurant = await response.filter(res => res.owner === ele.email);
                if (response.length > 0) {
                    res.status(200).json(restaurant);
                }
                else {
                    res.status(200).json({
                        message: "No data found"
                    })
                }
            })
            })
        })
    }
    else {
        res.status(401).send("Unauthorized");
    }
}

var getAdminRestaurantById = function (req, res, next) {
    let token = req.headers.authorization;
    if(token != null) {
    var decoded = jwtDecode(token);
    LoginSchema.findById(decoded.userId, (err, data) => {
        if (err) throw err
        if (data) {
            getRestaurantDetails.findById(req.params.id, (err, response) => {
                if (err) {
                    return next(err)
                }
                if (response) {
                    res.status(200).json(response);
                }
                else {
                    res.status(200).json({
                        message: "No data found"
                    })
                }
            })
        }
        else {
            res.status(401).send("Unauthorized");
        }
    })
}
else {
    res.status(401).json({
        message: "Unauthorized"
    })
}
}

var restaurantUpdate = function (req, res) {
    let token = req.headers.authorization;
    if(token != null) {
    var decoded = jwtDecode(token);
    getRestaurantDetails.findById(req.body._id, (error, data) => {
        console.log(data);
        if (error) throw error
        if (decoded.userId === data.userId) {
            getRestaurantDetails.findByIdAndUpdate(req.body._id, { $set: req.body },{new:true}, (err, response) => {
                if (err) {
                    return next(err)
                } else {
                    res.json(response)
                }
            })
        }
        else {
            res.status(200).json({
                message: "No data found"
            })
        }
    })
}
else {
    res.status(401).json({
        message: "Unauthorized"
    })
}
}

var statusUpdate = function (req, res) {
    getRestaurantDetails.findById(req.body.id, (error, data) => {
        if (error) throw error
        data.status = req.body.status;
        getRestaurantDetails.findByIdAndUpdate(req.body.id, { $set: data },{new:true},(err, response) => {
            if (err) throw err
             else {
                res.json(response)
            }
        })
    })
}

var restaurantTimeUpate = function(req,res){
    let token = req.headers.authorization;
    if(token != null) {
        getRestaurantDetails.findById(req.body._id, (error, data) => {
            if (error) throw error
            data.totalBookingTimes = req.body.totalBookingTimes;
            data.bookingShedule = req.body.bookingShedule;
        getRestaurantDetails.findByIdAndUpdate(req.body._id, { $set: data }, (err, response) => {
            if (err) {
                return next(err)
            } else {
                res.json(response)
            }
        });
    })
    }
    else {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
}

var searchAPI =async(req,res)=>{
    try{
        const text = req.query.key
        const result1 = text.toLowerCase()
        console.log(result1);
        adminRestaurant.aggregate([{$match:{$or:[{restaurantName:result1},{city:result1}]}}],(err,data)=>{
           if(err){
               throw err
           }
           else{
               res.status(200).send({message:data})
           }
        })
    }
    catch(err){
        res.status(500).send({message:err})
    }
   
}



module.exports = {
    approvedRestaurant:approvedRestaurant,
    getAllRestautant:getAllRestautant,
    getRestaurant: getRestaurant,
    statusUpdate: statusUpdate,
    addRestaurant: addRestaurant,
    getRestaurantById: getRestaurantById,
    restaurantUpdate: restaurantUpdate,
    getAdminRestaurant: getAdminRestaurant,
    updateAdminRestaurant: updateAdminRestaurant,
    getAdminRestaurantById: getAdminRestaurantById,
    restaurantTimeUpate: restaurantTimeUpate,
    searchAPI:searchAPI
}




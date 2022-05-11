const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator')
var jwtDecode = require('jwt-decode');
const Bcrypt = require('bcryptjs');
let getRestaurantDetails = require('./restaurantdetails.model');
let UsersSchema = require('./users.model');

var createUsers = function (req, response) {
    try {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            return response.status(400).send({ errors: errors.array() })
        }
        else{
            if(req.body != undefined){
                UsersSchema.countDocuments({contact: req.body.contact}, (err, data) => {
                    if (err) {
                        return response.status(500).send(err);
                    }
                    else if (data > 0) {
                       return response.status(200).json({ message: "Already exists" });
                    }
                    else {
                        req.body.password = Bcrypt.hashSync(req.body.password, 10);
                        var user = new UsersSchema(req.body);
                        user.save();
                        response.status(200).json({ message: "Successfully created" });
                    }
                })
            }
            else {
                response.status(500);
            }
        }
       
    } catch (error) {
        response.status(500).send(error);
    }
}


var addUsers = function (req, res,next) {
    console.log("data")
    let getUser;
    UsersSchema.findOne({
        contact: req.body.contact
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Username is does not exist"
            });
        }
        getUser = user;
        return Bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        else {
            let jwtToken = jwt.sign({
                userId: getUser._id
            }, "longer-secret-is-better", {
                expiresIn: "1h"
            });
            res.status(200).json({
                token: jwtToken,
                role: getUser.role,
                _id: getUser._id
            });
        }
    }).catch(err => {
        return
    });
}

var getUsers = function (req, res) {
    UsersSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            data = data.filter(res => res.role != 'superadmin');
            res.json(data)
        }
    })
};

var getId = function (req, res, next) {
    console.log("data")
    UsersSchema.findById(req.params.id, (error, data) => {
        console.log(data._id);
        let token = req.headers.authorization;
        var decoded = jwtDecode(token);
        console.log(decoded.userId);
        if (error) {
            return next(error);
        }
        if (data._id == decoded.userId) {
            res.status(200).json(data)
        }
        else {
            res.status(401).json({
                message: "Unauthoraized"
            })
        }
    })
}

var getRestaurant = function (req, res) {
    let token = req.headers.authorization;
    if (token != null) {
        getRestaurantDetails.find((error, data) => {
            if (error) {
                return next(error)
            }
            if (data.length <= 0) {
                return res.status(200).json(
                    { message: "No data found" }
                );
            }
            else {
                return res.status(200).json(data);
            }
        })
    }
    else {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
}

var getRestaurantBookingById = function (req, res, next) {
    let token = req.headers.authorization;
    if (token != null) {
        getRestaurantDetails.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error)
            }
            if (data.length <= 0) {
                return res.status(200).json(
                    { message: "No data found" }
                );
            }
            else {
                res.status(200).json(data);
            }
        })
    }
    else {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
}


module.exports = {
    addUsers: addUsers,
    getUsers: getUsers,
    getId: getId,
    createUsers: createUsers,
    getRestaurant: getRestaurant,
    getRestaurantBookingById: getRestaurantBookingById
}
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator')
var jwtDecode = require('jwt-decode');
const Bcrypt = require('bcryptjs');
// let superAdmin = require('./superAdminModel');

let LoginSchema = require('./login.model');

var createAdmin = function (req, response, next) {
    let token = req.headers.authorization;
    var decoded = jwtDecode(token);
    const verify = decoded.userId
    console.log(decoded.userId);
    try {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            return response.send({ errors: errors.array() })
        }
        else{
            LoginSchema.countDocuments({ username: req.body.username }, (err, data) => {
                if (err) {
                    return next(err);
                }
                if (data === 0) {
                    req.body.password = Bcrypt.hashSync(req.body.password, 10);
                    req.body.userId = verify;
                    var user = new LoginSchema(req.body);
                    user.save();
                    return response.status(200).json({ message: "Successfully created" });
                }
                else {
                        let token = req.headers.authorization;
                        var decoded = jwtDecode(token);
                        LoginSchema.findById(req.body.id, (error, res) => {
                            if(res){
                            if (decoded.userId === res.userId) {
                                LoginSchema.findByIdAndUpdate(req.body.id, { $set: req.body }, (err, data) => {
                                    response.status(200).json({ message: "Successfully updated" });
                                })
                            }
                            else {
                                return response.status(401).json({
                                    message: "Authentication failed"
                                });
                            }
                        }
                        else {
                            return response.status(200).json({
                                message: "Already exists"
                            });
                        }
                        })
                }
            })
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
}


var addUsers = function (req, res) {
    let getUser;
    LoginSchema.findOne({
        username: req.body.username
    }).then(user => {
        console.log("promise");
        if (!user) {
            console.log("inside if");
            return res.status(401).json({
                message: "Username is does not exist"
            });
        }
        getUser = user;
        console.log(user);
        return Bcrypt.compare(req.body.password, user.password);
       
    }).then(response => {
    console.log(response);
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
        return err
    });
}

var getUsers = function (req, res) {
    LoginSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            data = data.filter(res => res.role != 'superadmin');
            res.json(data)
        }
    })
};

var getId = function (req, res, next) {
    LoginSchema.findOne({_id:req.params.id},(err,data)=>{
        if(err){
            throw err
        }
        else{
            res.status(200).send({message:data})
        }
    })
    // LoginSchema.findById(req.params.id, (error, data) => {
    //     let token = req.headers.authorization;
    //     var decoded = jwtDecode(token);
    //     console.log(decoded.userId);
    //     console.log(data._id);
    //     if (error) {

    //         return next(error);
    //     }
    //     if (data._id === decoded.userId) {
    //         res.status(200).json(data)
    //     }
    //     else {
    //         res.status(401).json({
    //             message: "Unauthoraized"
    //         })
    //     }
    // })
}



// const superAdminLogin = (req,res)=>{
//     console.log("data");
//     superAdmin.findOne({userName:req.body.userName},(err,data)=>{
//         if(data){
//             // const password = Bcrypt.compare(req.body.password,data.password)
//             if(req.body.password == data.password){
//                 const token = jwt.sign({userId:data._id},"secred",{expiresIn: "1h"})
//                 res.status(200).send({message:"login successfully",token:token,role:"superAdmin"})
//             }
//         }
//     })
// }

module.exports = {
    addUsers: addUsers,
    getUsers: getUsers,
    getId: getId,
    createAdmin: createAdmin,
    // superAdminLogin:superAdminLogin
}
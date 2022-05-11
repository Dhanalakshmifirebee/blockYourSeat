const restaurantReview = require('./restaurantReviewModel')
let adminRestaurant = require('../restaurant/adminrestaurant.model')
var jwtDecode = require('jwt-decode');

const addReview = (req,res)=>{
    try{
        let token = req.headers.authorization;
        if(token!==null){
           var decoded = jwtDecode(token)
           req.body.userId = decoded.userId
           restaurantReview.create(req.body,(err,data)=>{
               if(err){
                   throw err
               }
               else{
                   console.log(data);
                   restaurantReview.findOne({_id:data._id},(err,data2)=>{
                       if(data){
                            adminRestaurant.findOneAndUpdate({_id:data2.restaurantId},{$set:{review:data2}},{new:true},(err,data)=>{ 
                                if(err){
                                    throw err  
                                }
                                else{
                                    console.log(data)
                                    res.status(200).send({message:data})
                                }
                            })
                       }
                       else{
                           res.status(500).send({message:"data not found"})
                       }
                    })
                }
           })
        }
        else{
            res.status(401).send({message:"unauthorized"})
        }
    }
    catch(err){
        res.status(500).send({message:err})
    }
}

const getReviewList = (req,res)=>{
    try{
       restaurantReview.find({},(err,data)=>{
           if(err) {
               throw err
            }
            else{
                res.status(200).send({message:"Review List",data})
            }
        })
    }
    catch(err){
        res.status(500).send({message:err})
    }
}





module.exports={
    addReview : addReview,
    getReviewList: getReviewList
}
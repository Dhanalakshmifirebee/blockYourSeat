const restaurantRating = require('./ratingModel')
const jwtDecode = require('jwt-decode')
const adminRestaurant = require('../restaurant/adminrestaurant.model')

const createReview = (req,res)=>{
    try{
       let token = req.headers.authorization
       if(token!==null){
           var decoded = jwtDecode(token)
           req.body.userId = decoded.userId
           restaurantRating.create(req.body,(err,data1)=>{
               console.log(data1)
               restaurantRating.countDocuments({restaurantId:data1.restaurantId},(err,num)=>{
                  console.log(num)
                  const noOfPersons = num
                  restaurantRating.find({restaurantId:data1.restaurantId},{rating:1,_id:0},(err,data2)=>{
                      console.log(data2)
                      var rating =0
                      for(var i =0;i<data2.length;i++){
                          rating += data2[i].rating
                      }
                      const average = rating/noOfPersons
                      console.log(average)
                      const a = Math.ceil(average)
                      console.log(a)
                      adminRestaurant.findOneAndUpdate({_id:data1.restaurantId},{$set:{rating:a}},{new:true},(err,data)=>{
                          if(err){
                              throw err
                          }
                          else{
                              res.status(200).send({message:data})
                          }
                      })

                  })
               })
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



module.exports={
    createReview:createReview
}
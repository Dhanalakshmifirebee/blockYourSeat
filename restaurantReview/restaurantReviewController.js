const restaurantReview = require('./restaurantReviewModel')
var jwtDecode = require('jwt-decode');

const addReview = (req,res)=>{
    try{
        let token = req.headers.authorization;
        if(token!==null){
           var decoded = jwtDecode(token)
           req.body.userId = decoded.userId
           var review = new restaurantReview(req.body);
           review.save();
           res.status(200).send({message:"review Added Successfully",review})
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
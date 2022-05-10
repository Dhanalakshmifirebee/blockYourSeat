const  FAQschema = require('./FAQ.model')


const createFAQ = (req,res)=>{
    try{
      FAQschema.create(req.body,(err,data)=>{
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

const getFAQ = (req,res)=>{
    try{
     FAQschema.find({deleteFlag:"false"},(err,data)=>{
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

const updateFAQ = (req,res)=>{
    try{
        FAQschema.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,data)=>{
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

const deleteFAQ = (req,res)=>{
    try{
        FAQschema.findOneAndUpdate({_id:req.params.id},{$set:{deleteFlag:"true"}},{new:true},(err,data)=>{
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
    createFAQ:createFAQ,
    getFAQ:getFAQ,
    updateFAQ:updateFAQ,
    deleteFAQ:deleteFAQ
}
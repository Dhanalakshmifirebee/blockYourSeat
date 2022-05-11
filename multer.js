const express = require('express');
const multer = require('multer')
const app = express();

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './upload/')     // './public/images/' directory name where save the file
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname);
    },
    
})

const fileFilters=(req,file,cb)=>{
    if(file.mimetype=='image/png'||file.mimetype=='image/jpg'||file.mimetype=='image/jpeg'||file.mimetype=='image/gif'){
        cb(null,true)
    }else{
    cb(null,false)
    }
}


var upload = multer({
    storage: storage,fileFilter:fileFilters
});


module.exports={
    upload
}
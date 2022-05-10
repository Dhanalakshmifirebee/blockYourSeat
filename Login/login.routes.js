const express=require('express');
 const logincontrollers=require('./logincontrollers');
 const valid = require('./validation')

 var loginRouting=express.Router();

 loginRouting.route('/dump').get(logincontrollers.getUsers);
 loginRouting.route('/login').post(logincontrollers.addUsers);
 loginRouting.route('/get-admin/:id').get(logincontrollers.getId);
 loginRouting.route('/createadmin').post(valid.validation,logincontrollers.createAdmin);

// loginRouting.route('/superAdminLogin').post(logincontrollers.superAdminLogin)

module.exports=loginRouting;
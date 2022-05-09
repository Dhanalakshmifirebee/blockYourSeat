const express=require('express');
 const logincontrollers=require('./logincontrollers');

 var loginRouting=express.Router();

 loginRouting.route('/dump').get(logincontrollers.getUsers);
 loginRouting.route('/login').post(logincontrollers.addUsers);
 loginRouting.route('/get-admin/:id').get(logincontrollers.getId);
 loginRouting.route('/createadmin').post(logincontrollers.createAdmin);

// loginRouting.route('/superAdminLogin').post(logincontrollers.superAdminLogin)

module.exports=loginRouting;
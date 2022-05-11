const {body,validationResult}=require('express-validator')


const validation =[
    body('email').trim().isEmail().toLowerCase().withMessage('email must be valid'),
    body('contact').isLength({max:10,min:10}).matches('[0-9]').withMessage('please enter vaild phone number'),
    body('password').isLength({max:16,min:8}).matches('[0-9]').matches('[A-Z]').matches('[a-z]').withMessage('password must be 5 character')
]




module.exports={validation}
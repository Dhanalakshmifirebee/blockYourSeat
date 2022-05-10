const {body,validationResult}=require('express-validator')


const validation =[
    body('email').trim().isEmail().toLowerCase().withMessage('email must be valid'),
    body('password').isLength({max:16,min:8}).matches('[0-9]').matches('[A-Z]').matches('[a-z]').withMessage('password must be 5 character')
]




module.exports={validation}
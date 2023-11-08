const { check } = require('express-validator')
const userValidation = [
    check('email').isEmail().withMessage('this is not real mail'),
    check('name').isLength({ min: 3 }).withMessage('it should have min 3 character'),
    check('password').isLength({ min: 6, max: 15 }).withMessage('this field should have min 8 and max 10 character'),
    check('document').isEmpty().withMessage('this is require field')
]

module.exports = userValidation;
const { check } = require("express-validator");

exports.loginValidation = [
    check('email', 'Email is required').not().isEmpty().isEmail().withMessage('Invalid email format'),
    check('password', 'Password is required').not().isEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

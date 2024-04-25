const express = require('express');
const router = express.Router();
const {signUpValidation,loginValidation} = require("../validation/register");
const userController = require("../controller/UserController");



router.post("/register",signUpValidation,userController.register);
router.post("/login",userController.login);


module.exports =router;
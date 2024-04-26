const express = require('express');
const router = express.Router();

const productController = require("../controller/ProductController");

router.post("/createproduct",productController.createProduct);




module.exports =router;
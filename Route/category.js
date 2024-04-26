const express = require('express');
const router = express.Router();
const category = require("../controller/CategoryController");



router.post("/create",category.createCategory);
router.delete("/delete/:id",category.deleteCategory);



module.exports =router;
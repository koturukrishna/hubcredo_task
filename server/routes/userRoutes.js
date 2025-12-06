const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const userController = require("../controllers/userControllers");

router.post("/add-user", userController.createUser);
router.post("/user-login", userController.userLogin);
module.exports = router;

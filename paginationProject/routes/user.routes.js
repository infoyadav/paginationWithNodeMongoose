const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.Controllers.js");

router.post("/createUser", userController.createUser);
router.get("/getUsers", userController.getAllUser);

module.exports = router;
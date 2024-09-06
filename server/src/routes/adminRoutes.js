const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Route to create a new admin
router.post("/create", adminController.createAdmin.bind(adminController));

// Route to log in an admin
router.post("/login", adminController.login.bind(adminController));

module.exports = router;

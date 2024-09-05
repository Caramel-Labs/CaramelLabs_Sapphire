const express = require("express");
const emailController = require("../controllers/emailController");

const router = express.Router();

router.post("/send-visa-result", emailController.sendVisaResultEmail);

module.exports = router;

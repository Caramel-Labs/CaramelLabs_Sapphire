const express = require("express");
const PaymentController = require("../controllers/paymentController");
const router = express.Router();

// Endpoint to create a PaymentIntent
router.post("/create-payment-intent", PaymentController.createPaymentIntent);

// Endpoint to handle payment success
router.post("/payment-status", PaymentController.handlePaymentStatus);

module.exports = router;

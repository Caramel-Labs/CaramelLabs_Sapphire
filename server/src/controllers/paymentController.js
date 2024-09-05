const PaymentService = require("../services/paymentService");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class PaymentController {
  /**
   * Handles the creation of a PaymentIntent via Stripe API
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createPaymentIntent(req, res) {
    const { userId, amount, currency } = req.body;

    try {
      console.log(
        `Creating payment intent for user ${userId} with amount ${amount} ${currency}`
      );

      const { clientSecret, paymentIntentId } =
        await PaymentService.processPayment(userId, amount, currency);

      console.log(`PaymentIntent created: ${paymentIntentId}`);

      // Respond with the clientSecret and paymentIntentId for the frontend to confirm the payment
      res.status(200).json({ clientSecret, paymentIntentId });
    } catch (error) {
      console.error(
        `Error creating PaymentIntent for user ${userId}: ${error.message}`
      );
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  }

  /**
   * Handles payment success, verifies the PaymentIntent, and saves payment details
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async handlePaymentStatus(req, res) {
    const { userId, visaId, paymentIntentId } = req.body;

    try {
      console.log(
        `Handling payment success for PaymentIntent ${paymentIntentId}`
      );

      // Retrieve the PaymentIntent from Stripe to verify the status
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      console.log(`PaymentIntent status: ${paymentIntent.status}`);

      // Check if the payment was successful
      if (paymentIntent.status === "succeeded") {
        // Save payment details to the database
        await PaymentService.savePaymentDetails(
          userId,
          visaId,
          paymentIntent.amount,
          paymentIntent.currency,
          paymentIntentId,
          "succeeded"
        );

        console.log(
          `Payment successful, PaymentIntent ${paymentIntentId} details saved.`
        );
        res.redirect("/success");
      } else {
        // Save payment details to the database
        await PaymentService.savePaymentDetails(
          userId,
          visaId,
          paymentIntent.amount,
          paymentIntent.currency,
          paymentIntentId,
          "failed"
        );
        console.warn(
          `Payment failed for PaymentIntent ${paymentIntentId}. Status: ${paymentIntent.status}`
        );
        res.redirect("/failed");
      }
    } catch (error) {
      console.error(
        `Error handling payment success for PaymentIntent ${paymentIntentId}: ${error.message}`
      );
      res.status(500).json({ error: "Failed to handle payment success" });
    }
  }
}

module.exports = new PaymentController();

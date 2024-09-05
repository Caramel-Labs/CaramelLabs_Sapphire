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
   * Handles payment success, verifies the PaymentIntent, and saves payment details.
   * @param {Object} req - Express request object containing userId, visaId, and paymentIntentId in the body.
   * @param {Object} res - Express response object to send the status back to the client.
   */
  async handlePaymentStatus(req, res) {
    const { userId, visaId, paymentIntentId } = req.body;

    try {
      // Validate input to ensure all necessary data is provided
      if (!userId || !visaId || !paymentIntentId) {
        console.warn(
          "Missing required payment details: userId, visaId, or paymentIntentId."
        );
        return res
          .status(400)
          .json({ error: "Missing required payment details" });
      }

      // Call PaymentService to save the payment details
      const paymentResult = await PaymentService.savePaymentDetails(
        userId,
        visaId,
        paymentIntentId
      );

      console.log(
        `PaymentIntent ${paymentIntentId} details saved for User ${userId} and Visa ${visaId}.`
      );
      res
        .status(200)
        .json({ message: "Payment details saved successfully", paymentResult });
    } catch (error) {
      console.error(
        `Error handling payment success for PaymentIntent ${paymentIntentId}: ${error.message}`
      );
      res.status(500).json({ error: "Failed to handle payment success" });
    }
  }
}

module.exports = new PaymentController();

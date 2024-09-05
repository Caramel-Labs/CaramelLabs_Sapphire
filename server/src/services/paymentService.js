const Stripe = require("stripe");
const Payment = require("../models/paymentModel");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  /**
   * Processes a payment using Stripe API by creating a PaymentIntent
   * @param {String} userId - ID of the user making the payment
   * @param {Number} amount - Amount to be charged (in smallest currency unit, e.g., cents)
   * @param {String} currency - Currency to charge in (e.g., 'usd')
   * @returns {Object} - Contains clientSecret and paymentIntentId for frontend processing
   */
  async processPayment(userId, amount, currency) {
    try {
      console.log(
        `Processing payment for user ${userId} with amount ${amount} ${currency}`
      );

      // Create a PaymentIntent with the provided amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      console.log(`PaymentIntent created successfully: ${paymentIntent.id}`);

      // Return client secret and paymentIntentId for frontend to confirm the payment
      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.error(
        `Payment processing failed for user ${userId}: ${error.message}`
      );
      throw new Error("Payment processing failed");
    }
  }

  /**
   * Saves payment details in the database after payment processing
   * @param {String} userId - ID of the user who made the payment
   * @param {String} visaId - ID of the visa associated with the payment
   * @param {String} paymentIntentId - Stripe PaymentIntent ID
   */
  async savePaymentDetails(userId, visaId, paymentIntentId) {
    try {
      console.log(
        `Saving payment details for user ${userId} and visa ${visaId}`
      );

      // Create a new payment record
      const payment = new Payment({
        userId,
        visaId,
        paymentIntentId,
      });

      // Save the payment record to the database
      await payment.save();
      console.log(
        `Payment details saved successfully for PaymentIntent ${paymentIntentId}`
      );
    } catch (error) {
      console.error(
        `Failed to save payment details for user ${userId}: ${error.message}`
      );
      throw new Error("Failed to save payment details");
    }
  }
}

module.exports = new PaymentService();

const PaymentService = require("../../src/services/paymentService");
const stripe = require("stripe");
const mockStripe = stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require("../../src/models/paymentModel");

jest.mock("stripe");
jest.mock("../../src/models/paymentModel");

describe("PaymentService", () => {
  describe("PaymentService - processPayment", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should process a payment successfully and return clientSecret and paymentIntentId", async () => {
      const mockPaymentIntent = {
        id: "pi_123",
        client_secret: "secret_123",
      };

      mockStripe.paymentIntents.create.mockResolvedValue(mockPaymentIntent);

      const result = await PaymentService.processPayment(
        "user_123",
        5000,
        "usd"
      );

      expect(result).toEqual({
        clientSecret: "secret_123",
        paymentIntentId: "pi_123",
      });
      expect(mockStripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: 5000,
        currency: "usd",
      });
    });

    it("should throw an error when payment processing fails", async () => {
      mockStripe.paymentIntents.create.mockRejectedValue(
        new Error("Stripe error")
      );

      await expect(
        PaymentService.processPayment("user_123", 5000, "usd")
      ).rejects.toThrow("Payment processing failed");

      expect(mockStripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: 5000,
        currency: "usd",
      });
    });
  });
  describe("PaymentService - savePaymentDetails", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should save payment details successfully", async () => {
      const mockSave = jest.fn().mockResolvedValue({});
      Payment.mockImplementation(() => ({
        save: mockSave,
      }));

      await PaymentService.savePaymentDetails(
        "user_123",
        "visa_123",
        5000,
        "usd",
        "pi_123",
        "succeeded"
      );

      expect(mockSave).toHaveBeenCalled();
      expect(Payment).toHaveBeenCalledWith({
        userId: "user_123",
        visaId: "visa_123",
        amount: 5000,
        currency: "usd",
        paymentIntentId: "pi_123",
        paymentStatus: "succeeded",
      });
    });

    it("should throw an error when saving payment details fails", async () => {
      const mockSave = jest.fn().mockRejectedValue(new Error("Database error"));
      Payment.mockImplementation(() => ({
        save: mockSave,
      }));

      await expect(
        PaymentService.savePaymentDetails(
          "user_123",
          "visa_123",
          5000,
          "usd",
          "pi_123",
          "succeeded"
        )
      ).rejects.toThrow("Failed to save payment details");

      expect(mockSave).toHaveBeenCalled();
    });
  });
});

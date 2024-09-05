const request = require("supertest");
const app = require("../../src/app");
const stripe = require("stripe");
const Payment = require("../../src/models/paymentModel");
require("dotenv").config();

jest.mock("stripe");
jest.mock("../../src/models/paymentModel");

describe("Payment Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a payment intent and return clientSecret and paymentIntentId", async () => {
    const mockPaymentIntent = {
      id: "pi_123",
      client_secret: "secret_123",
    };

    stripe(
      process.env.STRIPE_SECRET_KEY
    ).paymentIntents.create.mockResolvedValue(mockPaymentIntent);

    const response = await request(app)
      .post("/api/payments/create-intent")
      .send({ userId: "user_123", amount: 5000, currency: "usd" });

    expect(response.status).toBe(200);
    expect(response.body.clientSecret).toBe("secret_123");
    expect(response.body.paymentIntentId).toBe("pi_123");
  });

  it("should return 500 when payment intent creation fails", async () => {
    stripe(
      process.env.STRIPE_SECRET_KEY
    ).paymentIntents.create.mockRejectedValue(new Error("Stripe error"));

    const response = await request(app)
      .post("/api/payments/create-intent")
      .send({ userId: "user_123", amount: 5000, currency: "usd" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Failed to create payment intent");
  });
  it("should handle payment success and redirect to success page", async () => {
    const mockPaymentIntent = {
      id: "pi_123",
      amount: 5000,
      currency: "usd",
      status: "succeeded",
    };

    stripe(
      process.env.STRIPE_SECRET_KEY
    ).paymentIntents.retrieve.mockResolvedValue(mockPaymentIntent);
    const mockSave = jest.fn().mockResolvedValue({});
    Payment.mockImplementation(() => ({
      save: mockSave,
    }));

    const response = await request(app)
      .post("/api/payments/success")
      .send({ userId: "user_123", paymentIntentId: "pi_123" });

    expect(response.status).toBe(302); // Redirect status
    expect(response.header.location).toBe("/success");
  });

  it("should handle payment failure and redirect to failure page", async () => {
    const mockPaymentIntent = {
      id: "pi_123",
      amount: 5000,
      currency: "usd",
      status: "failed",
    };

    stripe(
      process.env.STRIPE_SECRET_KEY
    ).paymentIntents.retrieve.mockResolvedValue(mockPaymentIntent);

    const response = await request(app)
      .post("/api/payments/success")
      .send({ userId: "user_123", paymentIntentId: "pi_123" });

    expect(response.status).toBe(302);
    expect(response.header.location).toBe("/failed");
  });

  it("should return 500 when retrieving payment intent fails", async () => {
    stripe(
      process.env.STRIPE_SECRET_KEY
    ).paymentIntents.retrieve.mockRejectedValue(new Error("Stripe error"));

    const response = await request(app)
      .post("/api/payments/success")
      .send({ userId: "user_123", paymentIntentId: "pi_123" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Failed to handle payment success");
  });
});

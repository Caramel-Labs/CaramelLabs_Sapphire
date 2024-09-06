'use client'

import { useState, useEffect } from "react"
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js"
import ConvertToSubCurrency from "@/app/lib/convertToSubCurrency"
import { useFormState } from "@/app/context/formContext"

export default function Checkout({amount}){
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { onHandleNext } = useFormState()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
      redirect: 'if_required'
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // Destructure the payment intent ID from the response
    const { id: paymentIntentId } = paymentIntent;

    // Hardcoded value for userId (you should replace this with actual user ID in production)
    const userId = '64aeb7d2f0c64c1a2f3bcd5a';

    // Call the backend API
    const response = await fetch('http://localhost:4000/api/payment/payment-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId,
        visaId:'DNVSL00002',
        userId,
      }),
    });

    if (response.ok) {
      // If the API call is successful, navigate to the next page
      onHandleNext();
    } else {
      // Handle API error
      const data = await response.json();
      setErrorMessage(data.message || 'An error occurred while processing your payment.');
    }

    setLoading(false);
  };

  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div className="loading-spinner">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      <div>
        <h1>Payment Details</h1>
      </div>
      <PaymentElement />
      {errorMessage && <div>{errorMessage}</div>}
      <button 
        disabled={!stripe || loading} 
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
}
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "@/app/components/visa/payment/checkout"
import convertToSubcurrency from "@/app/lib/convertToSubCurrency";


if(!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing Stripe public key')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutWrapper () {
  const [clientSecret, setClientSecret] = useState(null);
  const amount  = 250

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center">
        <div className="loading-spinner">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Checkout amount={amount} />
    </Elements>
  );
};

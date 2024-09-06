import { useState } from 'react';
import FormBackButton from '@/app/components/visa/formBackButton';
import { useFormState } from "@/app/context/formContext";

export default function PaymentSelection() {
  const applicationDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const amount = '250';
  const currency = 'usd';
  const userId = '66d1fba57c2ac1b30482e2b5';

  const { onHandleNext, onHandleBack } = useFormState();

  const handleContinueToPayment = async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, amount, currency }),
      });

      if (response.ok) {
        onHandleNext();
      } else {
        console.error('Error processing payment:', response.status);
      }
    } catch (error) {
      console.error('Error making payment request:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <FormBackButton onHandleBack={onHandleBack} />

      {/* Title */}
      <h2 className="text-[22px] text-black flex justify-center items-center relative mt-4 font-semibold mb-2">
        Ready for Payment
      </h2>
      <p className="text-xs text-gray-600 mb-6 text-center">
        Upload your bank statement for the last 3 months to confirm your financial stability.
      </p>

      {/* Visa Application Details */}
      <div className="w-[328px] h-[225px] bg-gray-50 border border-gray-300 rounded-t-lg shadow-lg shadow-gray-400/50 mb-6 mx-auto">
        {/* Header aligned centrally */}
        <div className="bg-gray-200 px-4 rounded-t-lg h-[48px]">
          <h3 className="text-xs text-black font-semibold text-left pt-[14px] pb-[14px]">
            Visa Application Details
          </h3>
        </div>

        {/* Card content */}
        <div className="pt-4 px-4">
          <div className="grid grid-cols-2 gap-y-4 mb-4"> {/* Increased gap-y-4 for 16px space */}
            {/* First column: Labels */}
            <div className="text-gray-500 text-[10px] space-y-4"> {/* space-y-4 for 16px vertical space */}
              <p>Application number</p>
              <p>Applicant name</p>
              <p>Date of application</p>
            </div>

            {/* Second column: Values */}
            <div className="text-gray-900 text-[10px]  space-y-4 text-right font-bold"> {/* space-y-4 for 16px vertical space */}
              <p>DNVSL12345</p>
              <p>Saul Alejandro Pereira</p>
              <p>{applicationDate}</p>
            </div>
          </div>

          <div className="border-t  border-dashed pt-4 mt-2 flex justify-between items-center"> {/* Added padding-top for spacing */}
            <p className="text-[10px]  text-blue-600">Total amount</p>
            <p className="text-blue-600 font-bold text-[10px] ">${amount}.00</p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        className="w-full py-3 px-4 bg-sapphire text-white rounded-lg text-base font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mt-[210px]"
        onClick={handleContinueToPayment}
      >
        Continue to payment
      </button>
    </div>
  );
}

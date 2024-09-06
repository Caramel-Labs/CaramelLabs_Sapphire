import { useState } from 'react';
import { useFormState } from "@/app/context/formContext";

export default function PaymentSuccessful() {
  const { onHandleNext, formData } = useFormState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const applicationDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const handleDoneClick = async () => {
    setLoading(true);
    setError(null);

    setFormData({...formData, passportSizedPhoto : 'https://sapphire-assets.s3.ap-south-1.amazonaws.com/DNVSL0001-photo.PNG',
      bankStatement: '', 
      passportPhoto: 'https://sapphire-assets.s3.ap-south-1.amazonaws.com/DNVSL001-passport.webp'})

    try {
      const response = await fetch('http://localhost:4000/api/visa/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Call onHandleNext after successful API call
      onHandleNext();
    } catch (error) {
      setError('An error occurred while submitting your data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Title */}
      <h2 className="text-[22px] text-black flex justify-center items-center relative pt-[74px] font-semibold mb-4">
        Payment Successful
      </h2>
      <p className="text-xs text-gray-600 mb-8 text-center">
        Your payment is complete, and you will be notified when your visa is approved.
      </p>

      {/* Visa Application Details Card */}
      <div className="w-[328px] h-auto bg-gray-50 border border-gray-300 rounded-t-lg shadow-lg shadow-gray-400/50 mb-6 mx-auto">
        {/* Header aligned centrally */}
        <div className="bg-gray-200 px-4 rounded-t-lg h-[48px]">
          <h3 className="text-xs text-black font-semibold text-left pt-[14px] pb-[14px]">
            Visa Application Details
          </h3>
        </div>

        {/* Card content */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-y-4 mb-2">
            {/* First column: Labels */}
            <div className="text-gray-500 text-[10px] space-y-4">
              <p>Application number</p>
              <p>Applicant name</p>
              <p>Date of application</p>
            </div>

            {/* Second column: Values */}
            <div className="text-gray-900 text-[10px] font-bold space-y-4 text-right">
              <p>DNVB12345</p>
              <p>Saul Alejandro Pereira</p>
              <p>{applicationDate}</p>
            </div>
          </div>

          {/* Dotted line */}
          <div className="border-t border-dashed border-gray-300 mt-4 mb-2"></div>

          {/* Amount paid */}
          <div className="flex justify-between pt-2">
            <p className="text-[10px] text-teal-600">Amount paid</p>
            <p className="text-black font-bold text-[10px]">$250.00</p>
          </div>
        </div>
      </div>

      {/* Done Button */}
      <button
        className={`w-full py-2 px-4 bg-sapphire text-white rounded-lg text-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mt-[250px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleDoneClick}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Done'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

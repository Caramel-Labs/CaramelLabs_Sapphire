'use client'

import { useState } from 'react';
import FormBackButton from '@/app/components/visa/formBackButton';
import { useFormState } from "@/app/context/formContext";

export default function PassportDetails() {
  const [passportNo, setPassportNo] = useState('');
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [dateOfExpiry, setDateOfExpiry] = useState('');
  const [placeOfIssue, setPlaceOfIssue] = useState('');

  const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();

  const handleSubmit = () => {
    setFormData({
      ...formData,
      passportNo,
      dateOfIssue,
      dateOfExpiry,
      placeOfIssue,
    });
    onHandleNext();
  };

  return (
    <div className="max-w-md mx-auto bg-white">

      {/* Back Button */}
      <FormBackButton onHandleBack={onHandleBack} />

      {/* Heading */}
      <h2 className="text-black text-[22px] font-semibold text-center mt-4">Passport Details</h2>
      <p className="text-gray-500 text-xs text-center mt-4 mb-8">
        Provide your passport details to proceed with the visa application.
      </p>

      {/* Passport No */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700">Passport No</label>
        <input
          type="text"
          value={passportNo}
          onChange={(e) => setPassportNo(e.target.value)}
          placeholder="Enter your passport number"
          className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
          required
        />
      </div>

      {/* Date of Issue */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700">Date of Issue</label>
        <input
          type="date"
          value={dateOfIssue}
          onChange={(e) => setDateOfIssue(e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
          required
        />
      </div>

      {/* Date of Expiry */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700">Date of Expiry</label>
        <input
          type="date"
          value={dateOfExpiry}
          onChange={(e) => setDateOfExpiry(e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
          required
        />
      </div>

      {/* Place of Issue */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700">Place of Issue</label>
        <input
          type="text"
          value={placeOfIssue}
          onChange={(e) => setPlaceOfIssue(e.target.value)}
          placeholder="Enter the place where passport was issued"
          className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
          required
        />
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <button
          className="w-full bg-sapphire text-xs text-white py-[16px] px-[103px] rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-[100px]"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

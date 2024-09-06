'use client'

import { useState } from 'react';
import FormBackButton from '@/app/components/visa/formBackButton'
import FormContinueButton from '@/app/components/visa/formContinueButton'
import { useFormState } from "@/app/context/formContext"

export default function FamilyDetails() {
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [fatherName, setFatherName] = useState('');
  const [spouseName, setSpouseName] = useState('');
  const [spouseNationality, setSpouseNationality] = useState('');

  const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  const handleSubmit = () => {
    setFormData({
      ...formData,
      fatherName,
      maritalStatus,
      spouseName,
      spouseNationality
    });
    onHandleNext();
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-10 ">

      {/* Back Button */}
      <FormBackButton onHandleBack={onHandleBack} />

      {/* Heading */}
      <h2 className="text-black text-[22px] font-semibold text-center mt-4">Family Details</h2>
      <p className="text-gray-500 text-xs text-center mt-4 mb-8">
        Share your details to make your visa processing smoother and your experience more personalized.
      </p>

      {/* Father's Full Name */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700">Father's full name</label>
        <input
          type="text"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          placeholder="Enter your father's full name"
          className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
          required
        />
      </div>

      {/* Civil Status */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700">Civil Status</label>
        <select
          value={maritalStatus}
          onChange={handleMaritalStatusChange}
          className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black bg-white appearance-none focus:outline-none mb[280px]"
          required
          style={{ color: maritalStatus ? 'black' : '#A0AEC0' }} // This will make selected text black
        >
          <option value="Single" className="text-black">Single</option>
          <option value="Married" className="text-black">Married</option>
        </select>
      </div>

      {/* Conditional Fields for Married Status */}
      {maritalStatus === 'Married' && (
        <>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700">Full name of spouse</label>
            <input
              type="text"
              value={spouseName}
              onChange={(e) => setSpouseName(e.target.value)}
              placeholder="Enter your spouse's full name"
              className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 ">Current nationality of spouse</label>
            <select
              value={spouseNationality}
              onChange={(e) => setSpouseNationality(e.target.value)}
              className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black bg-white appearance-none focus:outline-none  "
              style={{ color: spouseNationality ? 'black' : '#A0AEC0' }} // This will make selected text black
            >
              
              <option value="Portugal" className="text-black">Portugal</option>
              <option value="Sri Lanka" className="text-black ">Sri Lanka</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </>
      )}

      {/* Continue Button */}
      <div className="text-center">
        <button
          className="w-full bg-sapphire text-xs text-white py-[16px] px-[103px] rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400  mt-[100px]"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

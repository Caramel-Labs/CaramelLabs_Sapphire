'use client'

import { useState } from 'react';
import FormBackButton from '@/app/components/visa/formBackButton'
import FormContinueButton from '@/app/components/visa/formContinueButton';
import { useFormState } from "@/app/context/formContext"

export default function PersonalDetails() {
  const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();

  // Create a new state object for personalData
  const [personalData, setPersonalData] = useState({
    forename: '',
    lastName: '',
    fullName: '',
    sexId: '',
    dateOfBirth: '',
    placeOfBirth: '',
    currentNationality: '',
    applicantAddress: '',
    height: {
      feet: '',
      inches: '',
    },
    occupation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHeightChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prevState) => ({
      ...prevState,
      height: {
        ...prevState.height,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set formData with the final personalData state
    setFormData(() => ({
      ...personalData, // Add form data except confirm_password
    }));
    onHandleNext();
  };

  return (
    <div className="bg-white min-h-screen pb-10 mb-16">
      <FormBackButton onHandleBack={onHandleBack} />
      <h1 className="text-black text-[22px] font-semibold text-center mt-4">Personal Information</h1>
      <p className="text-gray-500 text-xs text-center mt-4 mb-8">
        Share your details to make your visa processing smoother and your experience more personalized.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={personalData.forename}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={personalData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Full name</label>
          <input
            type="text"
            name="fullName"
            value={personalData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name as it appears in your passport"
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={personalData.sexId}
            onChange={handleInputChange}
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black bg-white"
            required
          >
            <option value="" className="text-gray-500">Select Gender</option>
            <option value="Male" className="text-black">Male</option>
            <option value="Female" className="text-black">Female</option>
            <option value="Other" className="text-black">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Date of birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={personalData.dateOfBirth}
            onChange={handleInputChange}
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Place of birth</label>
          <input
            type="text"
            name="placeOfBirth"
            value={personalData.placeOfBirth}
            onChange={handleInputChange}
            placeholder="Enter your place of birth"
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Current nationality(eg:EU)</label>
          <input
            type="text"
            name="currentNationality"
            value={personalData.currentNationality}
            onChange={handleInputChange}
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Applicant address</label>
          <input
            type="text"
            name="applicantAddress"
            value={personalData.applicantAddress}
            onChange={handleInputChange}
            placeholder="Enter your residential address in your nationality"
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Height</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="feet"
              value={personalData.height.feet}
              onChange={handleHeightChange}
              placeholder="Feet"
              className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
              required
            />
            <input
              type="number"
              name="inches"
              value={personalData.height.inches}
              onChange={handleHeightChange}
              placeholder="Inches"
              className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={personalData.occupation}
            onChange={handleInputChange}
            placeholder="Enter your occupation"
            className="mt-2 block w-full border border-gray-300 rounded-[8px] shadow-sm p-2 text-xs h-[48px] text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-sapphire text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors duration-300 text-xs h-[48px] mt-8"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

import { useState, useEffect } from 'react'
import formatDate from '@/app/lib/formatDate';

export default function VisaCard() {
  const [visaData, setVisaData] = useState(null);  // State to store fetched visa data
  const [loading, setLoading] = useState(true);    // State to manage loading state
  const [error, setError] = useState(null);        // State to handle any potential error

  // Fetch visa data from the API when the component mounts
  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/visa/64aeb7d2f0c64c1a2f3bcd5a')
        if (!response.ok) {
          throw new Error('Failed to fetch visa data');
        }
        const data = await response.json();
        setVisaData(data);  // Set the fetched visa data
      } catch (err) {
        setError(err.message);  // Set error message in case of failure
      } finally {
        setLoading(false);  // Stop loading state after data is fetched or error occurs
      }
    };

    fetchVisaData();
  }, []);  // Empty dependency array to run only once when component mounts

  // Show loading spinner or message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if data fetching fails
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render nothing if no data is available
  if (!visaData) {
    return null;
  }

  // Function to get styles based on visa status
  const getVisaStatusStyles = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'expired':
        return `text-red-600 bg-red-100 `;
      case 'inProgress':
        return 'text-yellow-600 bg-yellow-100 blur-sm';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header with Logo and Title */}
      <div className="flex justify-center items-center relative pt-6">
        <div className="text-base font-semibold text-black">
          <span className="text-cyan-600 text-base italic">Sapphire</span> E-Visa
        </div>
      </div>

      <div className={`p-4 bg-gradient-to-b from-pink-200 to-blue-200 rounded-lg shadow-lg mt-[35px] ${getVisaStatusStyles(visaData.visaStatus)}`}>
        {/* Visa Information */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-left">
            <h1 className="text-base font-bold text-gray-900">
              {visaData.name}  {/* Dynamic name */}
            </h1>
            <p className="text-xs text-gray-600">Sri Lankan Digital Nomad Visa (DNV69)</p>  
          </div>
          <div className="flex-shrink-0">
            <div className="h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <img src={''} alt="Seal" className="h-6 w-6 object-contain" />  {/* Dynamic seal image */}
            </div>
          </div>
        </div>

        {/* QR Code and Visa Number */}
        <div className="mt-8 flex items-center justify-between">
          <div className="h-20 w-20 bg-white rounded-md flex items-center justify-center">
            <img src={''} alt="QR Code" className="h-16 w-16 object-contain" /> 
          </div>
          <div className="text-xl font-semibold text-black bg-pink-300 px-[41px] py-[22px] rounded-lg">
            {visaData.visaId}  {/* Dynamic visa number */}
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-14 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs mb-2">Passport Number</span>
            <span className="font-bold text-xs text-gray-900">{visaData.passportNumber}</span>  {/* Dynamic passport number */}
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs mt-2 mb-2">Gender</span>
            <span className="font-bold text-xs text-gray-900 mt-2 mb-2">{visaData.gender}</span>  {/* Dynamic gender */}
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs mt-2 mb-2">Citizenship</span>
            <span className="font-bold text-xs text-gray-900 mt-2 mb-2">{visaData.nationality}</span>  {/* Dynamic citizenship */}
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs mt-2 mb-2">Date of Issue</span>
            <span className="font-bold text-xs text-gray-900 mt-2 mb-2">{formatDate(visaData.createdAt)}</span>  {/* Dynamic date of issue */}
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-xs mt-2 mb-2">Days of Stay</span>
            <span className="font-bold text-xs text-gray-900 mt-2 mb-2">{visaData.validdays}</span>  {/* Dynamic days of stay */}
          </div>
        </div>

        {/* Validity and Renewal Information */}
        <div className="mt-[50px] flex flex-col text-sm">
          <div className="">
            <span className={`h-3 w-3 rounded-full inline-block mr-2 ${visaData.visaStatus === 'approved' ? 'bg-green-500' : visaData.visaStatus === 'expired' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
            <span className={`${getVisaStatusStyles(visaData.visaStatus)} font-semibold text-[10px] capitalize`}>{visaData.visaStatus}</span>
          </div>
          <div className="flex text-[8px]">
            <p className="text-gray-500">Visa expires on {visaData.expiryDate}</p>  {/* Dynamic expiry date */}
            <a href={''} className="text-blue-500 underline ml-4">  {/* Dynamic renewal URL */}
              Renew now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

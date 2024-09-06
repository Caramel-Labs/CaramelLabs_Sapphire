import { useRef, useState, useEffect } from 'react';
import { useFormState } from "@/app/context/formContext"
import FormBackButton from '@/app/components/visa/formBackButton';

export default function BankDocumentUpload() {

    const {onHandleNext, onHandleBack} = useFormState()
  // Create a reference to the hidden file input element
  const fileInputRef = useRef(null);

  // State to manage the preview of the saved document
  const [documentName, setDocumentName] = useState('');
  const [documentData, setDocumentData] = useState(null);

  // Function to handle button click and trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Save the document name
      setDocumentName(file.name);

      // Read the file as a DataURL
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataURL = e.target.result;
        // Save document data URL to localStorage
        localStorage.setItem('bankDocument', dataURL);
        // Update state to display the document name
        setDocumentData(dataURL);
        console.log('Bank document saved to localStorage.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to remove the document from localStorage and state
  const handleRemoveDocument = () => {
    localStorage.removeItem('bankDocument');
    localStorage.removeItem('bankDocumentName');
    setDocumentName('');
    setDocumentData(null);
    console.log('Bank document removed from localStorage.');
  };

  // Load the document from localStorage on component mount
  useEffect(() => {
    const savedDocument = localStorage.getItem('bankDocument');
    if (savedDocument) {
      setDocumentData(savedDocument);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white  ">
        <FormBackButton onHandleBack={onHandleBack}/>  
      <h2 className="text-black text-[22px] font-semibold text-center mt-4">Bank Statement</h2>
      <p className="text-gray-500 text-xs text-center mt-4 mb-8">
        Upload your bank statement for the last 3 months to confirm your financial stability.
      </p>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload button */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 cursor-pointer"
        onClick={handleButtonClick}
      >
        <div className="flex flex-col items-center justify-center h-32">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H16M8 12H16M8 8H16"></path>
          </svg>
          <p className="mt-2 text-sm text-gray-500">Select document from Files</p>
        </div>
      </div>

      {/* Document preview section */}
      {documentName && (
        <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2 mt-4 w-full h-16">
          {/* Document name */}
          <p className="text-sm text-gray-700 truncate">{documentName}</p>

          {/* Remove button */}
          <button
            className="bg-red-500 text-white rounded-full p-1 focus:outline-none"
            onClick={handleRemoveDocument}
          >
            X
          </button>
        </div>
      )}

      <button className="w-full mt-[260px] py-2 px-4 bg-sapphire text-white rounded-lg text-xs hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 h-[48px]"
      onClick={onHandleNext}>
        Continue
      </button>
    </div>
  );
}

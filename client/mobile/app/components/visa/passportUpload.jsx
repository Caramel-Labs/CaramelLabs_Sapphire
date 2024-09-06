import { useRef, useState, useEffect } from 'react';
import { useFormState } from "@/app/context/formContext";
import FormBackButton from '@/app/components/visa/formBackButton';

export default function PassportUpload() {
  const { onHandleNext, onHandleBack } = useFormState();
  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataURL = e.target.result;
        localStorage.setItem('passportPhoto', dataURL);
        setPreviewImage(dataURL);
        console.log('Passport photo saved to localStorage.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    localStorage.removeItem('passportPhoto');
    setPreviewImage(null);
    setImageName("");
    console.log('Passport photo removed from localStorage.');
  };

  useEffect(() => {
    const savedImage = localStorage.getItem('passportPhoto');
    const savedImageName = localStorage.getItem('passportPhotoName');
    if (savedImage) {
      setPreviewImage(savedImage);
      setImageName(savedImageName);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto  bg-white">
      <FormBackButton onHandleBack={onHandleBack} />
      <h2 className="text-black text-[22px] font-semibold text-center mt-4">
        Photo of Passport
      </h2>
      <p className="text-gray-500 text-xs text-center mt-4 mb-8">
        Upload a clear photograph of your passports biodata page to verify your information.
      </p>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 cursor-pointer"
        onClick={handleButtonClick}
      >
        <div className="flex flex-col items-center justify-center h-32">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <p className="mt-2 text-sm text-gray-500">Select photo from gallery</p>
        </div>
      </div>

      <div className="flex items-center justify-center my-4">
        <div className="border-t border-gray-300 flex-grow mr-3"></div>
        <span className="text-sm text-gray-500">or</span>
        <div className="border-t border-gray-300 flex-grow ml-3"></div>
      </div>

      <button
        type="button"
        className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleButtonClick}
      >
        Open Camera and take photo
      </button>

      {previewImage && (
        <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2 mt-4 w-full h-16">
          <p className="text-sm text-gray-700 truncate">{imageName}</p>
          <div className="flex items-center">
            <img
              src={previewImage}
              alt="Preview"
              className="w-12 h-12 object-cover rounded-lg shadow-md mr-2"
            />
            <button
              className="bg-red-500 text-white rounded-full p-1 focus:outline-none"
              onClick={handleRemoveImage}
            >
              X
            </button>
          </div>
        </div>
      )}

      <button
        className="w-full mt-[180px]  bg-sapphire text-xs  py-[16px] px-[103px] text-white rounded-lg  hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 "
        onClick={onHandleNext}
      >
        Continue
      </button>
    </div>
  );
}

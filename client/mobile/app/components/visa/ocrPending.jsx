import { useState, useEffect } from 'react';
import convertor from '@/app/lib/convertor'; // Adjust the import path as necessary
import removeBase64Prefix from '@/app/lib/removeBase64Prefix';
import { useFormState } from "@/app/context/formContext";
import FormBackButton from '@/app/components/visa/formBackButton';

export default function OcrPending() {

const { onHandleNext, onHandleBack, formData } = useFormState()

  const [loading, setLoading] = useState(true);
  const [text, setText] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchImageAndProcess = async () => {
      try {
        // // Fetch image from localStorage
        // const image = localStorage.getItem('passportPhoto');
        // if (!image) throw new Error('No image found in localStorage');
        let url = formData.passportPhoto
        // // Create a URL for the image
        // // const url = URL.createObjectURL(new Blob([image]));
        // const url = removeBase64Prefix(image);  // Remove the base64 prefix from the image

        // // Call the OCR convertor function
        // const extractedText = await convertor(formData.passportPhoto);
        // setText(extractedText);
        if (url.length) {
          await convertor(url).then((txt) => {
            let copyTexts = text
            copyTexts.push(txt);
            setText(copyTexts);
            console.log('Text extracted:', text);
          });
        }
        // Send text to API endpoint
        const response= await fetch('https://sapphire.koyeb.app/visaguard/validate-ocr/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content:text[0],
            input_nationality: "USA",
          }),
        });

              // Check if the response is OK
          if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);  // Log the response to the console
            onHandleNext();  // Call onHandleNext to proceed to the next page
          } else {
            throw new Error('Failed to process the image and validate OCR');
          }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchImageAndProcess();
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="p-4 bg-white shadow-md rounded">
          <p className="text-gray-700">Loading...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-200 text-red-700 shadow-md rounded">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="p-4 bg-green-200 text-green-700 shadow-md rounded">
          <p>OCR processing complete. Text sent to the API.</p>
        </div>
      )}
    </div>
  );
}

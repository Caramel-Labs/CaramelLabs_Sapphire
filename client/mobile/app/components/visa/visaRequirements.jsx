import { useFormState } from "@/app/context/formContext";
import { useState } from "react";
import FormBackButton from "@/app/components/visa/formBackButton";
import FormContinueButton from "./formContinueButton";

export default function VisaRequirements() {
  const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();
  const [loading, setLoading] = useState(false);

  const requirements = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 24 24" fill="gray">
          <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm6 3a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 1c-.41.62-.75 1.29-.96 2h1.92A7.2 7.2 0 0 0 12 6m-1.3.22C9.78 6.53 9 7.17 8.54 8H10c.18-.62.4-1.22.7-1.78m2.59 0c.3.56.53 1.16.71 1.78h1.46c-.46-.83-1.25-1.46-2.17-1.78M8.13 9c-.08.32-.13.65-.13 1s.05.68.13 1h1.69c-.04-.33-.07-.66-.07-1s.03-.67.07-1zm2.7 0c-.05.32-.08.66-.08 1s.03.67.08 1h2.34c.04-.33.08-.66.08-1s-.04-.68-.08-1zm3.35 0c.04.33.07.66.07 1s-.03.67-.07 1h1.69c.08-.32.13-.65.13-1s-.05-.68-.13-1zm-5.64 3c.46.83 1.24 1.46 2.16 1.78c-.3-.56-.52-1.15-.7-1.78zm2.5 0c.21.72.55 1.38.96 2c.42-.62.75-1.28.96-2zM14 12c-.18.63-.41 1.22-.71 1.78c.92-.32 1.71-.95 2.17-1.78zm-7 5h10v2H7z"/>
        </svg>
      ),
      title: (
        <>
          Your <span className="text-teal-500 font-bold">passport</span>
        </>
      ),
      description: (
        <>
          or a clear photograph of the <strong className="font-semibold">biodata page</strong> of your passport
        </>
      ),
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 24 24" fill="gray">
  <path fill-rule="evenodd" d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828S16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M7.25 8A.75.75 0 0 1 8 7.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75M8 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"/>
</svg>
      ),
      title: (
        <>
          <span className="text-teal-500 font-bold">Bank statement</span>
        </>
      ),
      description: (
        <>
          containing your financial information for the <strong className="font-semibold">past 3 months</strong>
        </>
      ),
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 24 24" fill="gray"><path f fill-rule="evenodd" d="M3.6 2.25A1.35 1.35 0 0 0 2.25 3.6v16.8c0 .746.604 1.35 1.35 1.35h16.8a1.35 1.35 0 0 0 1.35-1.35V3.6a1.35 1.35 0 0 0-1.35-1.35zm9.15 3.25a.75.75 0 0 0-1.5 0v1.103c-.515.077-1.02.255-1.447.579C9.13 7.692 8.75 8.483 8.75 9.5q0 .744.342 1.316c.225.376.534.653.865.864c.612.39 1.393.602 2.039.778l.057.016c.719.196 1.284.357 1.685.612c.185.118.305.239.382.367c.073.123.13.292.13.547c0 .61-.245.992-.604 1.243c-.39.273-.965.422-1.62.399c-1-.037-1.955-.464-2.426-1.092a.75.75 0 1 0-1.2.9c.67.893 1.757 1.425 2.85 1.615V18.5a.75.75 0 0 0 1.5 0v-1.391c.628-.075 1.242-.276 1.756-.637c.757-.53 1.244-1.37 1.244-2.472q0-.744-.342-1.316a2.6 2.6 0 0 0-.865-.864c-.612-.39-1.393-.602-2.039-.778l-.057-.016c-.719-.196-1.284-.357-1.685-.612a1.1 1.1 0 0 1-.382-.367a1.03 1.03 0 0 1-.13-.547c0-.614.21-.935.458-1.122c.28-.212.716-.335 1.272-.32c.949.026 1.961.444 2.49.972a.75.75 0 1 0 1.06-1.06c-.682-.683-1.731-1.163-2.78-1.34z" clip-rule="evenodd"/></svg>



      ),
      title: (
        <>
          A payment of <span className="text-teal-500 font-bold">$250.00</span>
        </>
      ),
      description: (
        <>
          to apply for <strong className="font-semibold">Sri Lankan Digital Nomad Visa (DNVS9)</strong>
        </>
      ),
    },
  ];

  const handleContinue = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/visa/generateVisaId');
      if (!response.ok) {
        throw new Error('Failed to fetch visa ID');
      }
      const data = await response.json();
      const visaId = data.visaId; // Assuming the API returns { visaId: 'some-id' }
      console.log('Visa ID:', visaId);
      setFormData({ 
         ...formData, 
        visaId: visaId
      })
      onHandleNext();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white">
      {/* Back Button */}
      <FormBackButton onHandleBack={onHandleBack} />

      {/* Header */}
      <h1 className="text-black text-[22px] font-semibold text-center mt-4">
        Apply for Visa
      </h1>

      {/* Subheading */}
      <p className="text-gray-500 text-xs text-center mt-4 mb-8">
        Before we get started, please make sure that you have the following requirements prepared.
      </p>

      {/* Visa Requirements */}
      <div className="space-y-4 mb-6">
        {requirements.map((req, index) => (
          <div
            key={index}
            className="w-[328px] h-[132px] bg-white shadow-sm rounded-lg p-4 flex items-center border border-gray-300"
          >
            <div className="flex-shrink-0 w-[82px] h-[82px] flex items-center justify-center text-3xl mr-4">
              {req.icon}
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="font-semibold text-gray-700 text-xs">
                {req.title}
              </p>
              <p className="text-xs text-gray-600">
                {req.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <button
          onClick={handleContinue}
          className="w-full bg-sapphire text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors duration-300 text-xs h-[48px] mb-4"
        >
          Continue
        </button>
    </div>
  );
}

export default function CeylonCard({ name, points, qrCode }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[328px] h-[536px] bg-white rounded-[23px] border-4 border-teal-500 shadow-lg overflow-hidden">
        
        {/* Teal Background Area */}
        <div className="bg-sapphire w-[328px] h-[328px] flex items-center justify-center rounded-t-[19px] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[310px] h-[320px] bg-white rounded-full flex items-center justify-center">
              <img
                src="/path-to-ceylon-logo.png"  // Replace with the actual logo path
                alt="Ceylon Logo"
                className="w-40 h-40 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="relative p-6">
          <h2 className="text-xl font-bold mb-1 text-gray-900">{name}</h2>
          
          {/* Sapphire Points */}
          <p className="text-teal-500 font-semibold mb-4 ml-5 text-left text-xs mt-8">{points} Sapphire Points</p>
          
          {/* QR Code at Bottom Right */}
          <div className="absolute bottom-4 right-4">
            <img
              src={qrCode}  // Replace with the actual QR code path
              alt="QR Code"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Issuer Info */}
          <p className="text-sm text-left mt-16 text-black">Issued by</p>
          <p className="text-teal-500 font-semibold text-left italic">Sapphire</p>
        </div>
      </div>
    </div>
  );
}

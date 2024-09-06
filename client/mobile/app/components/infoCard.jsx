export default function InfoCard() {
  return (
    <div className="mt-4 w-[328px] h-[56px] bg-white rounded-lg shadow-md border border-gray-300 flex items-center justify-between px-4 mx-auto">
      
      {/* Rating Section */}
      <div className="flex flex-col items-center">
        <span className="text-xs font-bold text-gray-900 pl-2">5.0</span>
        <span className="text-yellow-500 text-xs pl-1">★★★★★</span>
      </div>
      
      {/* Custom Divider */}
      <div className="w-px h-8 bg-gray-300"></div>
      
      {/* Popularity Section */}
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-gray-500">Popular</span>
        <span className="text-xs font-semibold text-gray-500">Destination</span>
      </div>
      
      {/* Custom Divider */}
      <div className="w-px h-8 bg-gray-300"></div>
      
      {/* Temperature Section */}
      <div className="flex flex-col items-center">
        <span className="text-xs font-bold text-gray-900 pr-3">31°</span>
        <span className="text-[8px] font-semibold text-gray-500 pr-3">Sunny</span>
      </div>
      
    </div>
  );
}

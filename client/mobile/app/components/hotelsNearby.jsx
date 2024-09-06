import HotelsNearbyCard from "@/app/components/hotelsNearbyCard";

export default function HotelsNearby({ hotels }) {
  return (
    
    <div className="mt-8 px-4">
      <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
      <h3 className="text-[16px] font-semibold mb-4 text-gray-900">Hotels Nearby</h3>
      <div className="flex overflow-x-auto space-x-4">
        {hotels.map((hotel) => (
          <HotelsNearbyCard 
            key={hotel.id} 
            name={hotel.name} 
            location={hotel.location.address} 
          />
        ))}
      </div>
    </div>
  );
}

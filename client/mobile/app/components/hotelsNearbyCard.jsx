export default function HotelsNearbyCard({ name, location }) {
  return (
    <div className="w-[240px] flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-white">
      <img 
        className="w-full h-[120px] object-cover rounded-t-lg" 
        src="/images/headerImg.png" 
        alt={name} 
      />
      <div className="p-4">
        <h4 className="font-semibold text-xs mb-1 text-gray-800">{name}</h4>
        <p className="text-[10px] text-gray-600">{location}</p>
      </div>
    </div>
  );
}

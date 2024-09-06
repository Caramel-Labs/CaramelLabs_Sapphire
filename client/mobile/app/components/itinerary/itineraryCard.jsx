export default function ItineraryCard({ title, location, imageUrl, isGeneratedByAI }) {
  return (
    <div className="relative max-w-full rounded-lg shadow-lg overflow-hidden ">
      {/* Card Image */}
      <img
        className="w-full h-[180px] object-cover"
        src={imageUrl || '/images/headerImg.png'}
        alt={title}
      />
      
      {/* AI Generated Badge */}
      {isGeneratedByAI && (
        <div className="absolute top-2 right-2 bg-white shadow-sm rounded-full flex items-center p-1 text-xs text-blue-600 mb-4">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.122-6.545L.244 7.41l6.563-.955L10 1l3.193 5.455 6.563.955-4.243 4.135 1.122 6.545z" />
          </svg>
          Generated with AI
        </div>
      )}

      {/* Card Content */}
      <div className="px-4 py-3 bg-white">
        <h2 className="font-bold text-xs text-gray-900">{title}</h2>
        <p className="text-gray-500 text-[10px]">{location}</p>
      </div>
    </div>
  );
}

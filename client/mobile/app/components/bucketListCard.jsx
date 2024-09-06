'use client'

export default function BucketListCard({ cardData, isLastItem }) {
  const { name, location, rating, reviews, description, image, visited } = cardData;

  return (
    <div className={`relative pl-8 ${!isLastItem ? 'mb-10' : ''}`}>
      
      {/* Vertical line */}
      <div className={`absolute left-3 top-0 bottom-0 ${!isLastItem ? 'border-l-2 border-dotted border-gray-300' : ''}`}></div>
      
      {/* Circle Icon */}
      <div className="absolute left-0 top-0 transform -translate-y-1/2 bg-white mt-4">
        <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
          {visited ? (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ) : (
            <div className="h-6 w-6 rounded-full border-2 border-gray-400"></div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="ml-4">
        <h3 className="text-[16px] font-semibold text-gray-800 mb-4">{name}</h3>
        
        {/* Image */}
        <img src='/images/headerImg.png' alt={name} className={`rounded-lg w-[261px] h-[172px] object-cover ${visited ? 'grayscale' : ''} mb-4`} />

        {/* Location Address */}
        <p className="text-sm text-black mb-1">{location.address}</p>

        {/* Reviews and Rating */}
        <div className="flex items-center text-xs text-black mb-2 font-semibold">
          <span>{rating} &#x2022; {reviews.length} reviews</span>
        </div>

        {/* Description */}
        <p className="text-xs text-black mt-4">
          {description} <span className="text-blue-500">see more</span>
        </p>
      </div>
    </div>
  );
}

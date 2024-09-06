import StarRating from "@/app/components/reviews/starRating";

export default function ReviewCard(){
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex items-center mb-2">
            <StarRating rating={review.rating} />
            <span className="ml-2 text-gray-600 text-sm">{review.date}</span>
          </div>
          <p className="text-gray-800 mb-3">{review.content}</p>
          <div className="flex items-center">
            <img src={review.avatarUrl} alt={review.name} className="w-8 h-8 rounded-full mr-2" />
            <span className="text-gray-700 font-medium">{review.name}</span>
          </div>
        </div>
      );
}
import StarRating from "@/app/components/reviews/starRating";
import ReviewCard from "@/app/components/reviews/reviewCard";

export default function Reviews() {
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">What Nomads Say</h2>
          <div className="flex items-center mb-4">
            <span className="text-4xl font-bold mr-2">{averageRating.toFixed(1)}</span>
            <div>
              <StarRating rating={Math.round(averageRating)} />
              <p className="text-gray-600 text-sm">Popular Destination</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
  
        {reviews.slice(0, 2).map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
  
        <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
          Show all {reviews.length} reviews
        </button>
      </div>
    );
}
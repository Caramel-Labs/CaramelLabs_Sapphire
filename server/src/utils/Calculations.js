function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return parseFloat(averageRating.toFixed(1));
}
module.exports = { calculateAverageRating };

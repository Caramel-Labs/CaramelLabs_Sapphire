const Place = require("../models/placeModel");
const Hotel = require("../models/hotelModel");

class SearchService {
  async search(query) {
    const regexQuery = new RegExp(query, "i");

    const places = await Place.find({
      $or: [
        { name: regexQuery },
        { location: regexQuery },
        { description: regexQuery },
      ],
    }).select("imageUrl name location cost description");

    const hotels = await Hotel.find({
      $or: [
        { name: regexQuery },
        { location: regexQuery },
        { description: regexQuery },
      ],
    })
      .select("imgUrl name location cost description")
      .lean();

    return [...places, ...hotels];
  }
}

module.exports = new SearchService();

const TravelPlacesService = require("../../src/services/placeService");
const Place = require("../../src/models/placeModel");
const mongoose = require("mongoose");

jest.mock("../../src/models/placeModel");

describe("TravelPlacesService", () => {
  let mockPlaces, mockPlace;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Sample place data
    mockPlaces = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Place 1",
        interests: [
          new mongoose.Types.ObjectId("64f4c13b9a2a002001d32c89"),
          new mongoose.Types.ObjectId("64f4c13b9a2a002001d32c88"),
        ],
        reviews: [],
        matchCount: 2,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Place 2",
        interests: [new mongoose.Types.ObjectId("64f4c13b9a2a002001d32c88")],
        reviews: [],
        matchCount: 1,
      },
    ];

    mockPlace = {
      _id: new mongoose.Types.ObjectId(),
      name: "Sample Place",
      interests: [new mongoose.Types.ObjectId("64f4c13b9a2a002001d32c89")],
      reviews: [{ comment: "Great place", rating: 5 }],
    };
  });

  describe("findPlacesByInterests", () => {
    it("should find and return places sorted by match count", async () => {
      const interestIds = [
        "64f4c13b9a2a002001d32c88",
        "64f4c13b9a2a002001d32c89",
      ];

      Place.find.mockResolvedValue(mockPlaces);

      const result = await TravelPlacesService.findPlacesByInterests(
        interestIds
      );

      expect(Place.find).toHaveBeenCalledWith({
        interests: { $in: expect.any(Array) },
      });
      expect(result).toEqual([
        {
          _id: mockPlaces[0]._id,
          name: mockPlaces[0].name,
          interests: mockPlaces[0].interests,
          reviews: mockPlaces[0].reviews,
        },
        {
          _id: mockPlaces[1]._id,
          name: mockPlaces[1].name,
          interests: mockPlaces[1].interests,
          reviews: mockPlaces[1].reviews,
        },
      ]);
    });

    it("should handle no matching places gracefully", async () => {
      const interestIds = ["nonexistentInterestId"];

      Place.find.mockResolvedValue([]);

      const result = await TravelPlacesService.findPlacesByInterests(
        interestIds
      );

      expect(Place.find).toHaveBeenCalledWith({
        interests: { $in: expect.any(Array) },
      });
      expect(result).toEqual([]);
    });

    it("should handle duplicate interests in place correctly", async () => {
      const interestIds = ["64f4c13b9a2a002001d32c88"];

      const duplicateInterestsPlace = {
        ...mockPlaces[1],
        interests: [
          new mongoose.Types.ObjectId("64f4c13b9a2a002001d32c88"),
          new mongoose.Types.ObjectId("64f4c13b9a2a002001d32c88"),
        ],
      };

      Place.find.mockResolvedValue([duplicateInterestsPlace]);

      const result = await TravelPlacesService.findPlacesByInterests(
        interestIds
      );

      expect(result[0].matchCount).toBe(1);
    });
  });

  describe("findPlaceById", () => {
    it("should return a place by ID with populated reviews", async () => {
      Place.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockPlace),
      });

      const result = await TravelPlacesService.findPlaceById(mockPlace._id);

      expect(Place.findById).toHaveBeenCalledWith(mockPlace._id);
      expect(result).toEqual(mockPlace);
    });

    it("should throw an error if place not found", async () => {
      Place.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      await expect(
        TravelPlacesService.findPlaceById("nonexistentPlaceId")
      ).rejects.toThrow("Place not found");
    });

    it("should handle places with no reviews", async () => {
      const placeWithNoReviews = { ...mockPlace, reviews: [] };

      Place.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(placeWithNoReviews),
      });

      const result = await TravelPlacesService.findPlaceById(
        placeWithNoReviews._id
      );

      expect(result.reviews).toEqual([]);
    });
  });
});

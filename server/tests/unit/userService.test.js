const UserService = require("../../src/services/userServices");
const User = require("../../src/models/userModel");

jest.mock("../../src/models/userModel");

describe("UserService", () => {
  let mockUser;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Sample user data
    mockUser = {
      _id: "userId123",
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword",
      Sapphirepoints: 0,
      cards: [],
      interests: [],
      userExperiences: [],
    };
  });

  describe("createUser", () => {
    it("should create and save a new user", async () => {
      User.prototype.save = jest.fn().mockResolvedValue(mockUser);

      const result = await UserService.createUser(mockUser);

      expect(User).toHaveBeenCalledWith(mockUser);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe("updateUser", () => {
    it("should find and update a user by ID", async () => {
      const updatedUser = { ...mockUser, name: "Jane Doe" };
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedUser);

      const result = await UserService.updateUser("userId123", {
        name: "Jane Doe",
      });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "userId123",
        { name: "Jane Doe" },
        { new: true, runValidators: true }
      );
      expect(result).toEqual(updatedUser);
    });

    it("should return null if user not found", async () => {
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const result = await UserService.updateUser("nonExistentUserId", {
        name: "Jane Doe",
      });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "nonExistentUserId",
        { name: "Jane Doe" },
        { new: true, runValidators: true }
      );
      expect(result).toBeNull();
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID with populated fields", async () => {
      User.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await UserService.getUserById("userId123");

      expect(User.findById).toHaveBeenCalledWith("userId123");
      expect(result).toEqual(mockUser);
    });

    it("should return null if user not found", async () => {
      User.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      const result = await UserService.getUserById("nonExistentUserId");

      expect(User.findById).toHaveBeenCalledWith("nonExistentUserId");
      expect(result).toBeNull();
    });
  });

  describe("addUserExperience", () => {
    it("should add an experience to a user's profile", async () => {
      const updatedUser = {
        ...mockUser,
        userExperiences: ["experienceId123"],
      };
      User.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(updatedUser),
      });

      const result = await UserService.addUserExperience(
        "userId123",
        "experienceId123"
      );

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "userId123",
        { $addToSet: { userExperiences: "experienceId123" } },
        { new: true, runValidators: true }
      );
      expect(result).toEqual(updatedUser);
    });

    it("should return null if user not found", async () => {
      User.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      const result = await UserService.addUserExperience(
        "nonExistentUserId",
        "experienceId123"
      );

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "nonExistentUserId",
        { $addToSet: { userExperiences: "experienceId123" } },
        { new: true, runValidators: true }
      );
      expect(result).toBeNull();
    });
  });
});

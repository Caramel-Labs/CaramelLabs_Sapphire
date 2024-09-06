const User = require("../models/userModel");
require("../models/interestModel");
require("../models/experienceModel");

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async getUserById(userId) {
    return await User.findById(userId).populate("interests userExperiences");
  }
  addUserExperience = async (userId, experienceId) => {
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { userExperiences: experienceId } },
      { new: true, runValidators: true }
    ).populate("userExperiences");
  };
  addUserVisitedPlaces = async (userId, placeId) => {
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { userVisitedPlaces: placeId } },
      { new: true, runValidators: true }
    ).populate("userVisitedPlaces");
  };
}

module.exports = new UserService();

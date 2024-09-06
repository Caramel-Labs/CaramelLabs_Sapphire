const UserService = require("../services/userServices");

class UserController {
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const updatedUser = await UserService.updateUser(userId, req.body);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { userId } = req.params;
      const user = await UserService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  addUserExperience = async (req, res) => {
    try {
      const { userId, experienceId } = req.body;

      if (!userId || !experienceId) {
        return res
          .status(400)
          .json({ message: "userId and experienceId are required" });
      }

      const updatedUser = await UserService.addUserExperience(
        userId,
        experienceId
      );
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  addUserVisitedPlaces = async (req, res) => {
    try {
      const { userId, placeId } = req.body;

      if (!userId || !placeId) {
        return res
          .status(400)
          .json({ message: "userId and placeId are required" });
      }

      const updatedUser = await UserService.addUserVisitedPlaces(
        userId,
        placeId
      );
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = new UserController();

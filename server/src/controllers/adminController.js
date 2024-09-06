const adminService = require("../services/adminServices");

class AdminController {
  async createAdmin(req, res) {
    const { username, password } = req.body;

    try {
      console.log("Received request to create admin:", username);

      // Create the admin
      const admin = await adminService.createAdmin(username, password);

      // Respond with success message
      res.status(201).json({
        message: "Admin created successfully",
        admin: {
          username: admin.username,
        },
      });
    } catch (error) {
      console.error("Admin creation failed:", error.message);
      res.status(400).json({ message: "Failed to create admin" });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      console.log("Received login request for admin:", username);

      // Perform login
      const admin = await adminService.login(username, password);

      // Respond with a success message or token
      res.status(200).json({
        message: "Login successful",
        admin: {
          username: admin.username,
          // You can include a token here if using JWT
        },
      });
    } catch (error) {
      console.error("Login failed:", error.message);
      res.status(401).json({ message: "Invalid username or password" });
    }
  }
}

module.exports = new AdminController();

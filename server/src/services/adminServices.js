const Admin = require("../models/adminModel");

class AdminService {
  async createAdmin(username, password) {
    try {
      console.log("Creating admin with username:", username);

      // Check if the admin already exists
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        console.log("Admin already exists");
        throw new Error("Admin already exists");
      }

      // Create a new admin
      const admin = new Admin({ username, password });
      await admin.save();
      console.log("Admin created successfully");
      return admin;
    } catch (error) {
      console.error("Error creating admin:", error.message);
      throw error;
    }
  }

  async login(username, password) {
    try {
      console.log("Attempting to log in admin:", username);

      // Find the admin by username
      const admin = await Admin.findOne({ username });
      if (!admin) {
        console.log("Admin not found");
        throw new Error("Invalid username or password");
      }

      // Check the password
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        console.log("Password mismatch");
        throw new Error("Invalid username or password");
      }

      console.log("Admin logged in successfully");
      return admin;
    } catch (error) {
      console.error("Error during admin login:", error.message);
      throw error;
    }
  }
}

module.exports = new AdminService();

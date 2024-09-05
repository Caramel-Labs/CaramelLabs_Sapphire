const emailService = require("../services/emailService");
const asyncHandler = require("express-async-handler");

class EmailController {
  // @description Send visa result email to a user
  // @route POST /api/email/send-visa-result
  // @access Public (can be protected as needed)
  sendVisaResultEmail = asyncHandler(async (req, res) => {
    const { username, userEmail, visaStatus, applicationId } = req.body;

    // Validation for required fields
    if (!username || !userEmail || !visaStatus || !applicationId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      await emailService.sendVisaResultEmail(
        username,
        userEmail,
        visaStatus,
        applicationId
      );
      res.status(200).json({ message: "Visa result email sent successfully" });
    } catch (error) {
      console.error(`Error sending visa result email: ${error.message}`);
      res.status(500).json({ error: "Error sending visa result email" });
    }
  });
}

module.exports = new EmailController();

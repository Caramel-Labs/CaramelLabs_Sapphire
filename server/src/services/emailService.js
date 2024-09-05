const nodemailer = require("nodemailer");
const { visaResultTemplate } = require("../utils/EmailTemplate");

class EmailService {
  // Function to send visa result email
  async sendVisaResultEmail(username, userEmail, visaStatus, applicationId) {
    try {
      console.log(process.env.EMAIL_USER);
      console.log(process.env.EMAIL_PASS);
      // Create a reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email content based on the visaStatus (approved/rejected)
      const emailContent = visaResultTemplate(
        username,
        visaStatus,
        applicationId
      );

      // Send mail with defined transport object
      const mailOptions = {
        from: `"Visa Application" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Visa Application Result - Application ID: ${applicationId}`,
        html: emailContent,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);

      // Log the message ID to track the email
      console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      console.error(`Error in sending email: ${error.message}`);
      throw new Error("Email sending failed");
    }
  }
}

module.exports = new EmailService();

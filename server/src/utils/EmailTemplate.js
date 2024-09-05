const visaResultTemplate = (username, visaStatus, applicationId) => {
  const statusMessage =
    visaStatus === "approved"
      ? `
      <p>We are pleased to inform you that your visa application has been <strong>approved</strong>! You may now proceed with the next steps in your travel plans. Please ensure that you review all the information regarding your visa validity and any conditions associated with it.</p>
      <p>If you need further assistance, feel free to contact our support team or visit our website for more details.</p>
    `
      : `
      <p>We regret to inform you that your visa application has been <strong>rejected</strong> after careful review. Please note that this decision is final based on the information provided during the application process.</p>
      <p>If you believe there was an error or you would like to reapply, we encourage you to check the guidelines and submit a new application with the required documents.</p>
    `;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Visa Application Result - Application ID: ${applicationId}</h2>
      <p>Dear ${username},</p>
      ${statusMessage}
      <p>Application ID: <strong>${applicationId}</strong></p>
      <p>For further inquiries or detailed information, please do not hesitate to reach out to our support team at <a href="mailto:support@visaapp.com">support@visaapp.com</a>.</p>
      <br/>
      <p>Best regards,</p>
      <p><strong>The Visa Application Team</strong></p>
      <hr/>
      <footer style="font-size: 0.85em; color: #888;">
        <p>Note: This email contains confidential information intended for the recipient. If you are not the intended recipient, please delete this email immediately and notify us at the address provided.</p>
      </footer>
    </div>
  `;
};

module.exports = { visaResultTemplate };

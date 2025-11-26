export const otpEmailTemplate = (name, otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background: #f6f6f6; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 25px; border-radius: 10px;">

      <h2 style="text-align:center; color:#4CAF50; margin-bottom: 10px;">Groovo Verification</h2>

      <p style="font-size: 16px; color: #333;">
        Hi <strong>${name}</strong>,
      </p>

      <p style="font-size: 15px; color: #555;">
        Your One-Time Password (OTP) for verifying your account is:
      </p>

      <div style="text-align:center; margin: 20px 0;">
        <span style="font-size: 28px; font-weight: bold; background: #4CAF50; color: white; padding: 10px 20px; border-radius: 8px;">
          ${otp}
        </span>
      </div>

      <p style="font-size: 15px; color:#555;">
        This OTP is valid for the next <strong>5 minutes</strong>. Please do not share it with anyone.
      </p>

      <p style="font-size: 14px; color:#777; margin-top: 25px;">
        Regards,<br/>
        <strong>Team Groovo</strong>
      </p>
    </div>
  </body>
  </html>
  `;
};

import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender email - you should update this to your verified domain
export const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

interface SendOTPEmailParams {
  to: string;
  otp: string;
  userName?: string;
  type: 'verification' | 'password-reset' | 'sign-in';
}

interface SendPasswordResetEmailParams {
  to: string;
  resetUrl: string;
  userName?: string;
}

export async function sendOTPEmail({ to, otp, userName, type }: SendOTPEmailParams) {
  const subject = (type === 'verification' || type === 'sign-in')
    ? 'Verify Your Email - Lown Scholars'
    : 'Reset Your Password - Lown Scholars';

  const htmlContent = (type === 'verification' || type === 'sign-in')
    ? getVerificationEmailHTML(otp, userName)
    : getPasswordResetEmailHTML(otp, userName);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error in sendOTPEmail:', error);
    throw error;
  }
}

function getVerificationEmailHTML(otp: string, userName?: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <!-- Header with Crimson Gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #A51C30 0%, #EB001B 100%); padding: 40px 20px; text-align: center;">
                    <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                      <h1 style="color: #A51C30; margin: 0; font-size: 32px; font-weight: bold;">LS</h1>
                    </div>
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Lown Scholars</h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 40px 20px;">
                    <h2 style="color: #1a1a1a; margin: 0 0 20px; font-size: 24px; font-weight: 600;">
                      ${userName ? `Hello ${userName},` : 'Hello,'}
                    </h2>
                    <p style="color: #666; margin: 0 0 30px; font-size: 16px; line-height: 1.6;">
                      Thank you for signing up! To complete your registration, please verify your email address using the code below:
                    </p>

                    <!-- OTP Code Box -->
                    <div style="background: linear-gradient(135deg, #A51C30 0%, #EB001B 100%); border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                      <p style="color: white; margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                        Verification Code
                      </p>
                      <p style="color: white; margin: 0; font-size: 42px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                        ${otp}
                      </p>
                    </div>

                    <p style="color: #666; margin: 30px 0 0; font-size: 14px; line-height: 1.6;">
                      This code will expire in <strong>10 minutes</strong>. If you didn't request this verification, please ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9f9f9; padding: 30px 40px; border-top: 1px solid #e5e5e5;">
                    <p style="color: #999; margin: 0; font-size: 12px; line-height: 1.6; text-align: center;">
                      This is an automated message from Lown Scholars. Please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function getPasswordResetEmailHTML(otp: string, userName?: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <!-- Header with Crimson Gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #A51C30 0%, #EB001B 100%); padding: 40px 20px; text-align: center;">
                    <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                      <h1 style="color: #A51C30; margin: 0; font-size: 32px; font-weight: bold;">LS</h1>
                    </div>
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Lown Scholars</h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 40px 20px;">
                    <h2 style="color: #1a1a1a; margin: 0 0 20px; font-size: 24px; font-weight: 600;">
                      ${userName ? `Hello ${userName},` : 'Hello,'}
                    </h2>
                    <p style="color: #666; margin: 0 0 30px; font-size: 16px; line-height: 1.6;">
                      We received a request to reset your password. Use the code below to complete the process:
                    </p>

                    <!-- OTP Code Box -->
                    <div style="background: linear-gradient(135deg, #A51C30 0%, #EB001B 100%); border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                      <p style="color: white; margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                        Reset Code
                      </p>
                      <p style="color: white; margin: 0; font-size: 42px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                        ${otp}
                      </p>
                    </div>

                    <p style="color: #666; margin: 30px 0 0; font-size: 14px; line-height: 1.6;">
                      This code will expire in <strong>10 minutes</strong>. If you didn't request a password reset, please ignore this email or contact support if you have concerns.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9f9f9; padding: 30px 40px; border-top: 1px solid #e5e5e5;">
                    <p style="color: #999; margin: 0; font-size: 12px; line-height: 1.6; text-align: center;">
                      This is an automated message from Lown Scholars. Please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function sendPasswordResetEmail({ to, resetUrl, userName }: SendPasswordResetEmailParams) {
  const subject = 'Reset Your Password - Lown Scholars';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <!-- Header with Crimson Gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #A51C30 0%, #EB001B 100%); padding: 40px 20px; text-align: center;">
                    <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center;">
                      <span style="color: #A51C30; font-size: 32px; font-weight: bold; line-height: 80px;">LS</span>
                    </div>
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Lown Scholars</h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 40px 20px;">
                    <h2 style="color: #1a1a1a; margin: 0 0 20px; font-size: 24px; font-weight: 600;">
                      ${userName ? `Hello ${userName},` : 'Hello,'}
                    </h2>
                    <p style="color: #666; margin: 0 0 30px; font-size: 16px; line-height: 1.6;">
                      We received a request to reset your password. Click the button below to create a new password:
                    </p>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 40px 0;">
                      <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #A51C30 0%, #EB001B 100%); color: white; text-decoration: none; padding: 16px 48px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(165, 28, 48, 0.3);">
                        Reset Password
                      </a>
                    </div>

                    <p style="color: #666; margin: 30px 0 0; font-size: 14px; line-height: 1.6;">
                      This link will expire in <strong>1 hour</strong>. If you didn't request a password reset, you can safely ignore this email.
                    </p>

                    <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #A51C30; border-radius: 4px;">
                      <p style="color: #666; margin: 0; font-size: 13px; line-height: 1.6;">
                        <strong>Button not working?</strong><br>
                        Copy and paste the following link into your browser:<br>
                        <a href="${resetUrl}" style="color: #A51C30; word-break: break-all;">${resetUrl}</a>
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9f9f9; padding: 30px 40px; border-top: 1px solid #e5e5e5;">
                    <p style="color: #999; margin: 0; font-size: 12px; line-height: 1.6; text-align: center;">
                      This is an automated message from Lown Scholars. Please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending password reset email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Password reset email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error in sendPasswordResetEmail:', error);
    throw error;
  }
}

# Email Configuration Guide

This application uses **Resend** for email delivery, including email verification and password reset functionality.

## Environment Variables

Make sure you have these variables in your `.env.local` file:

```env
# Resend API Key (Required)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# From Email Address (Optional)
# If not set, defaults to 'onboarding@resend.dev'
# For production, use your verified domain email
FROM_EMAIL=noreply@yourdomain.com
```

## Getting Started with Resend

### 1. Create a Resend Account
- Visit [https://resend.com](https://resend.com)
- Sign up for a free account
- Free tier includes: 100 emails/day, 3,000 emails/month

### 2. Get Your API Key
1. Go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Copy the key and add it to your `.env.local` file

### 3. Configure Sender Email

#### Development (Default)
The default sender is `onboarding@resend.dev` which works immediately for testing.

#### Production (Recommended)
For production, you should:
1. Verify your domain in Resend
2. Set up DNS records (SPF, DKIM, DMARC)
3. Use your custom email like `noreply@yourdomain.com`

## Email Features

### 1. Email Verification on Registration
When a user signs up:
- A 6-digit OTP code is generated
- Email is sent with the verification code
- User must enter the code to activate their account
- Code expires after 10 minutes

**Flow:**
1. User fills registration form → `/signup`
2. Account created (not verified)
3. Redirected to → `/verify-email?email=user@example.com`
4. User enters 6-digit code from email
5. Upon success → redirected to `/dashboard`

### 2. Password Reset
When a user forgets their password:
- A 6-digit OTP code is generated
- Email is sent with the reset code
- User enters code and new password
- Code expires after 10 minutes

**Flow:**
1. User clicks "Forgot password?" → `/forgot-password`
2. User enters email
3. Reset email sent with 6-digit code
4. User clicks link or manually goes to `/reset-password?token=XXXXXX`
5. User enters new password
6. Upon success → redirected to `/login`

## Email Templates

The application includes beautiful, responsive email templates with:
- Harvard Library brand colors (Crimson gradient)
- Mobile-friendly design
- Clear call-to-action
- Professional layout

### Verification Email Preview:
```
Subject: Verify Your Email - Lown Scholars

Hello [Name],

Thank you for signing up! To complete your registration,
please verify your email address using the code below:

┌─────────────────────┐
│  Verification Code  │
│      123456         │
└─────────────────────┘

This code will expire in 10 minutes.
```

### Password Reset Email Preview:
```
Subject: Reset Your Password - Lown Scholars

Hello [Name],

We received a request to reset your password.
Use the code below to complete the process:

┌─────────────────────┐
│    Reset Code       │
│      123456         │
└─────────────────────┘

This code will expire in 10 minutes.
```

## Testing

### Development Mode
In development, all emails will be logged to the console:
```bash
Email verification requested for user@example.com
Verification token: 123456
Email sent successfully to user@example.com
```

### Production Mode
In production, emails are sent via Resend's API.

## Customization

### Changing Email Templates
Edit the HTML templates in `lib/resend.ts`:
- `getVerificationEmailHTML()` - Email verification template
- `getPasswordResetEmailHTML()` - Password reset template

### Changing OTP Code Length
Currently set to 6 digits. To change:
1. Update validation in `components/auth/VerifyEmailForm.tsx`
2. Update Better Auth configuration if needed

### Adding More Email Types
1. Add new function in `lib/resend.ts`
2. Create new email template function
3. Call from your server actions in `server/users.ts`

## Troubleshooting

### Emails Not Sending
1. Check `RESEND_API_KEY` is correctly set in `.env.local`
2. Verify API key is active in Resend dashboard
3. Check console logs for error messages
4. Ensure you haven't exceeded daily/monthly limits

### Emails Going to Spam
1. Verify your domain in Resend
2. Set up proper DNS records (SPF, DKIM, DMARC)
3. Use a custom sender email from your verified domain
4. Avoid spam trigger words in email content

### User Not Receiving Verification Email
1. Check spam/junk folder
2. Verify email address is correct
3. Check Resend logs in dashboard
4. Ensure email sending didn't fail (check server logs)

## Security Notes

- ✅ OTP codes expire after 10 minutes
- ✅ Codes are single-use only
- ✅ Better Auth handles token generation securely
- ✅ All email communication is logged for debugging
- ✅ Rate limiting is handled by Better Auth
- ⚠️ Never commit `.env.local` to version control
- ⚠️ Use different API keys for development and production

## Support

- Resend Documentation: https://resend.com/docs
- Better Auth Documentation: https://www.better-auth.com/docs
- Report issues: Create an issue in the repository

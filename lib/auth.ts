import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
import * as schema from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { resend, sendOTPEmail } from "./resend";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    emailAndPassword: {
        enabled: true,
        // async sendResetPassword({ user, url, token }, request) {
        //     console.log(`Password reset requested for ${user.email}`);
        //     console.log(`Reset URL: ${url}`);
        //     console.log(`Token: ${token}`);

        //     try {
        //         const { sendPasswordResetEmail } = await import('./resend');
        //         await sendPasswordResetEmail({
        //             to: user.email,
        //             resetUrl: url,
        //             userName: user.name
        //         });
        //         console.log(`Password reset email sent successfully to ${user.email}`);
        //     } catch (error) {
        //         console.error(`Failed to send password reset email to ${user.email}:`, error);
        //         throw error;
        //     }
        // }
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        },
    }),
    plugins: [
        nextCookies(),
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                try {
                    let emailType: 'verification' | 'password-reset' | 'sign-in' = 'verification';

                    if (type === 'sign-in') {
                        emailType = 'sign-in';
                    } else if (type === 'email-verification') {
                        emailType = 'verification';
                    } else if (type === 'forget-password') {
                        emailType = 'password-reset';
                    }

                    await sendOTPEmail({
                        to: email,
                        otp: otp,
                        type: emailType
                    });
                } catch (error) {
                    console.error(`Failed to send OTP email to ${email}:`, error);
                    throw error;
                }
            },
            // OTP expires in 10 minutes
            otpLength: 6,
            expiresIn: 600, // 10 minutes in seconds
            sendVerificationOnSignUp: true, // Send OTP when user signs up
        })
    ]
});
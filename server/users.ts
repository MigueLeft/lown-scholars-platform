"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export type ActionResponse<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }

export const signIn = async (email: string, password: string): Promise<ActionResponse> => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            },
            headers: await headers()
        })
        return { success: true, data: undefined }
    } catch (error) {
        console.error("Error in signIn:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error signing in"
        }
    }
}

export const signUp = async (name: string, email: string, password: string): Promise<ActionResponse> => {
    try {
        // Create the account - OTP will be sent automatically if sendVerificationOnSignUp is true
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            },
            headers: await headers()
        })

        return { success: true, data: undefined }
    } catch (error) {
        console.error("Error in signUp:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error creating account"
        }
    }
}

export const signOut = async (): Promise<ActionResponse> => {
    try {
        await auth.api.signOut({
            headers: await headers()
        })
        return { success: true, data: undefined }
    } catch (error) {
        console.error("Error in signOut:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error signing out"
        }
    }
}

export const getSession = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        return session
    } catch (error) {
        console.error("Error getting session:", error)
        return null
    }
}

export const changePassword = async (currentPassword: string, newPassword: string): Promise<ActionResponse> => {
    try {
        await auth.api.changePassword({
            body: {
                currentPassword,
                newPassword,
                revokeOtherSessions: false
            },
            headers: await headers()
        })
        return { success: true, data: undefined }
    } catch (error) {
        console.error("Error in changePassword:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error changing password"
        }
    }
}

export const sendVerificationOtp = async (email: string): Promise<ActionResponse> => {
    try {
        await auth.api.sendVerificationOTP({
            body: {
                email,
                type: 'email-verification'
            },
            headers: await headers()
        })
        return { success: true, data: undefined }
    } catch (error) {
        console.error("Error in sendVerificationOtp:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error sending verification code"
        }
    }
}

export const verifyEmailWithOtp = async (email: string, otp: string): Promise<ActionResponse> => {
    try {
        await auth.api.verifyEmailOTP({
            body: {
                email,
                otp
            },
            headers: await headers()
        })
        return { success: true, data: undefined }
    } catch (error) {
        console.error("Error in verifyEmailWithOtp:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Invalid or expired verification code"
        }
    }
}

export const requestPasswordReset = async (email: string, redirectTo: string): Promise<ActionResponse> => {
    console.log("REDIRECT TO", redirectTo)
    try {
        await auth.api.requestPasswordReset({
            body: {
                email,
                redirectTo
            },
            headers: await headers()
        })
        return { success: true, data: undefined }
    } catch (error) {
        console.error("Error in requestPasswordReset:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error requesting password reset"
        }
    }
}

export const resetPassword = async (newPassword: string, token: string): Promise<ActionResponse> => {
    try {
        await auth.api.resetPassword({
            body: {
                newPassword,
                token
            },
            headers: await headers()
        })
        return { success: true, data: undefined }
    } catch (error) {
        console.error("Error in resetPassword:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Invalid or expired reset link"
        }
    }
}
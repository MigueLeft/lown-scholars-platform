'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Alert } from '@mui/material';
import { requestPasswordReset } from '@/server/users';
import Link from 'next/link';
import { Email as EmailIcon } from '@mui/icons-material';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validations
    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);

    try {
      // Build the redirect URL for the password reset page
      const redirectTo = '/reset-password';
      const result = await requestPasswordReset(email, redirectTo);

      if (result.success) {
        // Show success message instead of redirecting
        setSuccess(true);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error requesting password reset. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">
      <div className="text-center mb-2">
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(165, 28, 48, 0.1)' }}
          >
            <EmailIcon sx={{ fontSize: 32, color: 'var(--color-brand-crimson)' }} />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3">
          FORGOT PASSWORD
        </h1>
        <p className="text-body text-sm">
          Enter your email address and we&apos;ll send you a link to reset your password
        </p>
      </div>

      {error && (
        <Alert severity="error" className="rounded-lg">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" className="rounded-lg">
          Email sent! Check your inbox and click the link to reset your password. The link will expire in 1 hour.
        </Alert>
      )}

      {!success && (
        <>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            autoComplete="email"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'var(--color-brand-crimson)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--color-brand-crimson)',
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--color-brand-crimson)',
              }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              backgroundColor: 'var(--color-brand-crimson)',
              '&:hover': {
                opacity: 0.9,
              }
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </>
      )}

      <div className="text-center mt-4">
        <Link
          href="/login"
          className="text-sm font-medium no-underline hover:underline"
          style={{ color: 'var(--color-brand-crimson)' }}
        >
          ← Back to Sign In
        </Link>
      </div>
    </form>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TextField, Button, Alert } from '@mui/material';
import { MarkEmailRead as EmailIcon } from '@mui/icons-material';
import { verifyEmailWithOtp, sendVerificationOtp } from '@/server/users';
import Link from 'next/link';

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get email from URL params (optional, for display purposes)
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validations
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!otp) {
      setError('Verification code is required');
      return;
    }

    if (otp.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    setLoading(true);

    try {
      const result = await verifyEmailWithOtp(email, otp);

      if (result.success) {
        setSuccess(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login?verified=true');
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error verifying email. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await sendVerificationOtp(email);
      if (result.success) {
        alert('Verification code resent! Check your email.');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error resending code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
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
          VERIFY EMAIL
        </h1>
        <p className="text-body text-sm">
          {email
            ? `We sent a verification code to ${email}`
            : 'Enter the 6-digit code we sent to your email'
          }
        </p>
      </div>

      {error && (
        <Alert severity="error" className="rounded-lg">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" className="rounded-lg">
          Email verified successfully! Redirecting to dashboard...
        </Alert>
      )}

      {!success && (
        <>
          <TextField
            fullWidth
            label="Verification Code"
            name="otp"
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={handleOtpChange}
            disabled={loading}
            required
            placeholder="000000"
            helperText="Enter the 6-digit code from your email"
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
              },
              '& input': {
                fontSize: '24px',
                letterSpacing: '8px',
                textAlign: 'center',
                fontFamily: 'monospace',
              }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || otp.length !== 6}
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
            {loading ? 'Verifying...' : 'Verify Email'}
          </Button>

          <div className="text-center">
            <p className="text-sm" style={{ color: 'var(--color-subtle)' }}>
              Didn&apos;t receive the code?{' '}
              <button
                type="button"
                className="font-semibold no-underline hover:underline"
                style={{
                  color: 'var(--color-brand-crimson)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
                onClick={handleResendOtp}
                disabled={loading}
              >
                Resend
              </button>
            </p>
          </div>
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

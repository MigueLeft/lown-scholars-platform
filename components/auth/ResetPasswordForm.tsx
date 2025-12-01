'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Lock as LockIcon } from '@mui/icons-material';
import { resetPassword } from '@/server/users';
import Link from 'next/link';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get token from URL query parameter
    const tokenParam = searchParams.get('token');
    const errorParam = searchParams.get('error');

    if (errorParam === 'INVALID_TOKEN') {
      setError('Invalid or expired reset link. Please request a new one.');
      setToken(null);
    } else if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('No reset token found. Please request a new password reset link.');
      setToken(null);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!token) {
      setError('No reset token found. Please request a new password reset link.');
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(formData.password, token);

      if (result.success) {
        router.push('/login?reset=success');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error resetting password. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">
      <div className="text-center mb-2">
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(165, 28, 48, 0.1)' }}
          >
            <LockIcon sx={{ fontSize: 32, color: 'var(--color-brand-crimson)' }} />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3">
          RESET PASSWORD
        </h1>
        <p className="text-body text-sm">
          Enter your new password below
        </p>
      </div>

      {error && (
        <Alert severity="error" className="rounded-lg">
          {error}
          {!token && (
            <div className="mt-2">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold underline"
                style={{ color: 'inherit' }}
              >
                Request new link
              </Link>
            </div>
          )}
        </Alert>
      )}

      <TextField
        fullWidth
        label="New Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
        required
        autoComplete="new-password"
        helperText="Password must be at least 8 characters"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
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

      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        disabled={loading}
        required
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
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
        {loading ? 'Resetting...' : 'Reset Password'}
      </Button>

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

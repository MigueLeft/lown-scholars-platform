'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn } from '@/server/users';
import Link from 'next/link';

export default function SigninForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error signing in. Please try again.');
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
        <h1 className="text-3xl font-bold mb-3">
          SIGN IN
        </h1>
        <p className="text-body">
          Enter your credentials to continue
        </p>
      </div>

      {error && (
        <Alert severity="error" className="rounded-lg">
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
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

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
        required
        autoComplete="current-password"
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

      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-sm font-medium no-underline hover:underline"
          style={{ color: 'var(--color-brand-crimson)' }}
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
        className="btn-primary"
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
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="text-center mt-4">
        <p className="text-small" style={{ color: 'var(--color-text-secondary)' }}>
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold no-underline hover:underline"
            style={{ color: 'var(--color-brand-crimson)' }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
}

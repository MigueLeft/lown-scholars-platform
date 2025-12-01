'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signUp } from '@/server/users';
import Link from 'next/link';

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(formData.name, formData.email, formData.password);

      if (result.success) {
        // Show email sent confirmation instead of redirecting
        setEmailSent(true);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error creating account. Please try again.');
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

  // If email was sent successfully, show confirmation screen
  if (emailSent) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-md">
        <div className="text-center mb-2">
          <div className="flex justify-center mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(165, 28, 48, 0.1)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--color-brand-crimson)" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3">
            REVISA TU EMAIL
          </h1>
          <p className="text-body text-sm">
            Hemos enviado un código de verificación a:
          </p>
          <p className="text-body font-semibold mt-2" style={{ color: 'var(--color-brand-crimson)' }}>
            {formData.email}
          </p>
        </div>

        <Alert severity="success" className="rounded-lg">
          Por favor revisa tu correo e ingresa el código de 6 dígitos para completar tu registro.
        </Alert>

        <div className="space-y-3">
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)}
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
            Ingresar Código de Verificación
          </Button>

          <p className="text-center text-sm" style={{ color: 'var(--color-subtle)' }}>
            ¿No recibiste el correo?{' '}
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
              onClick={() => setEmailSent(false)}
            >
              Intentar de nuevo
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold mb-3">
          CREATE ACCOUNT
        </h1>
        <p className="text-body">
          Complete your details to register
        </p>
      </div>

      {error && (
        <Alert severity="error" className="rounded-lg">
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
        required
        autoComplete="name"
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'var(--color-brand-blue)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--color-brand-blue)',
            }
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-brand-blue)',
          }
        }}
      />

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
              borderColor: 'var(--color-brand-blue)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--color-brand-blue)',
            }
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-brand-blue)',
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
        autoComplete="new-password"
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
              borderColor: 'var(--color-brand-blue)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--color-brand-blue)',
            }
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-brand-blue)',
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
                aria-label="toggle confirm password visibility"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'var(--color-brand-blue)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--color-brand-blue)',
            }
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-brand-blue)',
          }
        }}
      />

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
          backgroundColor: 'var(--color-brand-blue)',
          '&:hover': {
            backgroundColor: 'var(--color-brand-blue-dark)',
          }
        }}
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>

      <div className="text-center mt-4">
        <p className="text-small" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold no-underline hover:underline"
            style={{ color: 'var(--color-brand-crimson)' }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}

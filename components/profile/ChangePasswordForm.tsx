'use client';

import { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePassword } from '@/server/users';

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    setLoading(true);

    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);

      if (result.success) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to change password.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-harvard p-6">
      <h2 className="text-xl font-bold mb-4 normal-case" style={{ color: 'var(--color-heading)' }}>
        Change Password
      </h2>

      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField
          fullWidth
          label="Current Password"
          type={showCurrentPassword ? 'text' : 'password'}
          value={passwordData.currentPassword}
          onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="p-2"
              >
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'var(--color-brand-crimson)',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--color-brand-crimson)',
            },
          }}
        />

        <TextField
          fullWidth
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          value={passwordData.newPassword}
          onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="p-2"
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'var(--color-brand-crimson)',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--color-brand-crimson)',
            },
          }}
        />

        <TextField
          fullWidth
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={passwordData.confirmPassword}
          onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-2"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'var(--color-brand-crimson)',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--color-brand-crimson)',
            },
          }}
        />

        <div className="md:col-span-3">
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: 'var(--color-brand-crimson)',
              textTransform: 'none',
              fontWeight: 600,
              py: 1.5,
              px: 4,
              '&:hover': {
                backgroundColor: '#8B1828',
              },
            }}
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </form>
    </div>
  );
}

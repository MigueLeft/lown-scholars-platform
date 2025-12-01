'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { signOut } from '@/server/users';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await signOut();
      if (result.success) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="outlined"
      sx={{
        borderColor: 'var(--color-brand-crimson)',
        color: 'var(--color-brand-crimson)',
        '&:hover': {
          borderColor: 'var(--color-brand-crimson)',
          backgroundColor: 'rgba(165, 28, 48, 0.04)',
        }
      }}
    >
      {loading ? 'Signing out...' : 'Sign Out'}
    </Button>
  );
}

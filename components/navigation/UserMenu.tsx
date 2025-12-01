'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, IconButton, Popover, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Logout as LogoutIcon, Person as PersonIcon } from '@mui/icons-material';
import { signOut } from '@/server/users';
import Link from 'next/link';

interface UserMenuProps {
  userName?: string;
  userEmail?: string;
  userImage?: string;
}

export default function UserMenu({ userName, userEmail, userImage }: UserMenuProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await signOut();
      if (result.success) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-menu-popover' : undefined;

  // Get initials from user name
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          padding: 0,
          '&:hover': {
            opacity: 0.8,
          },
        }}
        aria-describedby={id}
      >
        <Avatar
          src={userImage}
          alt={userName || 'User'}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: 'white',
            color: 'var(--color-brand-crimson)',
            fontWeight: 600,
            fontSize: '1rem',
            border: '2px solid white',
          }}
        >
          {getInitials(userName)}
        </Avatar>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          mt: 1,
        }}
      >
        <div className="p-4 min-w-[250px]">
          <div className="flex items-center gap-3 mb-3">
            <Avatar
              src={userImage}
              alt={userName || 'User'}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: 'var(--color-brand-crimson)',
                color: 'white',
                fontWeight: 600,
              }}
            >
              {getInitials(userName)}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: 'var(--color-heading)' }}>
                {userName || 'User'}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--color-subtle)' }}>
                {userEmail || 'user@example.com'}
              </p>
            </div>
          </div>

          <Divider sx={{ my: 1 }} />

          <List sx={{ padding: 0 }}>
            <ListItem
              component={Link}
              href="/profile"
              onClick={handleClose}
              sx={{
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(165, 28, 48, 0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <PersonIcon sx={{ color: 'var(--color-brand-crimson)' }} />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                primaryTypographyProps={{
                  sx: { color: 'var(--color-brand-crimson)', fontWeight: 500 },
                }}
              />
            </ListItem>

            <ListItem
              component="button"
              onClick={handleLogout}
              disabled={loading}
              sx={{
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%',
                border: 'none',
                background: 'transparent',
                padding: '8px 16px',
                '&:hover': {
                  backgroundColor: 'rgba(165, 28, 48, 0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon sx={{ color: 'var(--color-brand-crimson)' }} />
              </ListItemIcon>
              <ListItemText
                primary={loading ? 'Signing out...' : 'Sign Out'}
                primaryTypographyProps={{
                  sx: { color: 'var(--color-brand-crimson)', fontWeight: 500 },
                }}
              />
            </ListItem>
          </List>
        </div>
      </Popover>
    </>
  );
}

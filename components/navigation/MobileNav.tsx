'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Drawer,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Description as DescriptionIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { signOut } from '@/server/users';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { name: 'Patients', path: '/patients', icon: PeopleIcon },
  { name: 'Forms', path: '/forms', icon: DescriptionIcon },
  { name: 'Statistics', path: '/statistics', icon: BarChartIcon },
];

interface MobileNavProps {
  userName?: string;
  userImage?: string;
}

export default function MobileNav({ userName, userImage }: MobileNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    }
  };

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
      {/* Mobile Header */}
      <header
        className="lg:hidden sticky top-0 z-50 border-b px-4 py-3"
        style={{
          backgroundColor: 'var(--color-brand-crimson)',
          borderColor: 'transparent'
        }}
      >
        <div className="flex items-center justify-between">
          <IconButton
            onClick={handleOpen}
            sx={{
              color: 'white',
            }}
          >
            <MenuIcon />
          </IconButton>

          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: 'white', color: 'var(--color-brand-crimson)' }}
            >
              LS
            </div>
            <span className="font-bold text-white">
              Lown Scholars
            </span>
          </div>

          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            fontFamily: 'var(--font-trueno)',
          },
        }}
      >
        <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-trueno)' }}>
          {/* User Info */}
          <div className="p-4 bg-gray-50 border-b border-gray-200 relative">
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <div className="flex flex-col items-center gap-3 pt-2">
              <Avatar
                src={userImage}
                alt={userName || 'User'}
                sx={{
                  width: 64,
                  height: 64,
                  backgroundColor: 'var(--color-brand-crimson)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                }}
              >
                {getInitials(userName)}
              </Avatar>
              <p className="font-semibold text-center" style={{ color: 'var(--color-heading)' }}>
                {userName || 'User'}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <List sx={{ padding: 0 }}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <ListItem
                    key={item.path}
                    component={Link}
                    href={item.path}
                    onClick={handleClose}
                    sx={{
                      borderRadius: '8px',
                      mb: 1,
                      position: 'relative',
                      backgroundColor: 'transparent',
                      color: isActive ? 'var(--color-brand-crimson)' : 'var(--color-body)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                      '&::after': isActive ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--color-brand-crimson)',
                      } : {},
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? 'var(--color-brand-crimson)' : 'var(--color-subtle)',
                      }}
                    >
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 700 : 500,
                        fontFamily: 'var(--font-trueno)',
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              disabled={loading}
              sx={{
                borderColor: 'var(--color-brand-crimson)',
                color: 'var(--color-brand-crimson)',
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
                '&:hover': {
                  borderColor: 'var(--color-brand-crimson)',
                  backgroundColor: 'rgba(165, 28, 48, 0.04)',
                },
              }}
            >
              {loading ? 'Signing out...' : 'Sign Out'}
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

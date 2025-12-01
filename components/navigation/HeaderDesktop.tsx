'use client';

import useCollapsed from '@/store/useCollapsed';
import UserMenu from './UserMenu';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface HeaderDesktopProps {
  userName?: string;
  userEmail?: string;
  userImage?: string;
}

export default function HeaderDesktop({ userName, userEmail, userImage }: HeaderDesktopProps) {
  const { collapsed, setCollapsed } = useCollapsed();

  return (
    <header
      className="hidden lg:flex items-center justify-between border-b px-6 py-4 sticky top-0 z-40"
      style={{
        backgroundColor: 'var(--color-brand-crimson)',
        borderColor: 'transparent'
      }}
    >
      <div className="flex-1">
        <IconButton
          onClick={() => setCollapsed()}
          size="small"
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {collapsed ? <ChevronRight />  : <ChevronLeft />}
        </IconButton>
        {/* This space can be used for breadcrumbs or page title */}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium hidden xl:block text-white" style={{ fontFamily: 'var(--font-lora), Georgia, ui-serif, serif' }}>
          {userName || 'User'}
        </span>
        <UserMenu userName={userName} userEmail={userEmail} userImage={userImage} />
      </div>
    </header>
  )
}

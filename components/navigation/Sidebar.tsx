'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconButton, Tooltip } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Description as DescriptionIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import useCollapsed from '@/store/useCollapsed';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { name: 'Patients', path: '/patients', icon: PeopleIcon },
  { name: 'Forms', path: '/forms', icon: DescriptionIcon },
  { name: 'Statistics', path: '/statistics', icon: BarChartIcon },
];

export default function Sidebar() {
  const { collapsed } = useCollapsed();
  const pathname = usePathname();

  return (
    <aside
      className={`hidden lg:flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      } h-screen sticky top-0 bg-white border-r`}
      style={{
        fontFamily: 'var(--font-trueno)',
        borderColor: 'var(--color-border)',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Logo Section */}
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{
          backgroundColor: 'var(--color-brand-crimson)',
          borderColor: 'transparent'
        }}
      >
        {!collapsed && (
          <>
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
                style={{ backgroundColor: 'white', color: 'var(--color-brand-crimson)' }}
              >
                LS
              </div>
              <span className="font-bold text-lg text-white">
                Lown Scholars
              </span>
            </div>
          </>
        )}
        {collapsed && (
          <div className="flex flex-col items-center gap-3 mx-auto">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
              style={{ backgroundColor: 'white', color: 'var(--color-brand-crimson)' }}
            >
              LS
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Tooltip
              key={item.path}
              title={collapsed ? item.name : ''}
              placement="right"
              slotProps={{
                tooltip: {
                  sx: {
                    backgroundColor: 'var(--color-brand-crimson)',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    padding: '8px 12px',
                    fontFamily: 'var(--font-trueno)',
                  },
                },
              }}
            >
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                  collapsed ? 'justify-center' : ''
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: 'rgba(165, 28, 48, 0.1)',
                        color: 'var(--color-brand-crimson)'
                      }
                    : {
                        color: 'var(--color-text-secondary)'
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon />
                {!collapsed && <span className="font-semibold">{item.name}</span>}
                {/* Left border for active state */}
                {isActive && (
                  <span
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                    style={{ backgroundColor: 'var(--color-brand-crimson)' }}
                  />
                )}
              </Link>
            </Tooltip>
          );
        })}
      </nav>
    </aside>
  );
}

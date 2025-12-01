'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, IconButton, Menu, MenuItem, Chip } from '@mui/material';
import { MoreVert as MoreVertIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { useState } from 'react';

interface Form {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Inactive';
  responses: number;
  createdDate: string;
  lastModified: string;
}

// Mock forms data
const mockForms: Form[] = [
  {
    id: '1',
    title: 'Initial Patient Assessment',
    description: 'Comprehensive health screening and intake form for new patients',
    status: 'Active',
    responses: 127,
    createdDate: '2024-01-10',
    lastModified: '2024-03-15',
  },
  {
    id: '2',
    title: 'Mental Health Evaluation',
    description: 'Psychological well-being assessment for ongoing care',
    status: 'Active',
    responses: 89,
    createdDate: '2024-01-20',
    lastModified: '2024-03-10',
  },
  {
    id: '3',
    title: 'Family Information Survey',
    description: 'Collect family history and emergency contact information',
    status: 'Active',
    responses: 156,
    createdDate: '2023-12-15',
    lastModified: '2024-02-28',
  },
  {
    id: '4',
    title: 'Immigration Status Documentation',
    description: 'Legal documentation and immigration status tracking',
    status: 'Inactive',
    responses: 45,
    createdDate: '2023-11-05',
    lastModified: '2024-01-15',
  },
  {
    id: '5',
    title: 'Housing Needs Assessment',
    description: 'Evaluate current housing situation and needs',
    status: 'Active',
    responses: 73,
    createdDate: '2024-02-01',
    lastModified: '2024-03-12',
  },
  {
    id: '6',
    title: 'Employment Skills Survey',
    description: 'Assess work history and employment readiness',
    status: 'Active',
    responses: 61,
    createdDate: '2024-02-10',
    lastModified: '2024-03-08',
  },
  {
    id: '7',
    title: 'Education Background Form',
    description: 'Document educational history and language proficiency',
    status: 'Inactive',
    responses: 32,
    createdDate: '2023-10-20',
    lastModified: '2023-12-30',
  },
  {
    id: '8',
    title: 'Monthly Check-in Survey',
    description: 'Regular wellness and progress tracking questionnaire',
    status: 'Active',
    responses: 234,
    createdDate: '2023-09-15',
    lastModified: '2024-03-18',
  },
];

export default function FormsPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<{ element: HTMLElement | null; formId: string | null }>({
    element: null,
    formId: null,
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, formId: string) => {
    event.stopPropagation();
    setAnchorEl({ element: event.currentTarget, formId });
  };

  const handleMenuClose = () => {
    setAnchorEl({ element: null, formId: null });
  };

  const handleViewStats = () => {
    if (anchorEl.formId) {
      router.push(`/forms/${anchorEl.formId}`);
    }
    handleMenuClose();
  };

  const handleCardClick = (formId: string) => {
    router.push(`/forms/${formId}`);
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'var(--color-brand-blue)' : 'var(--color-subtle)';
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 normal-case" style={{ color: 'var(--color-brand-crimson)' }}>
          Forms
        </h1>
        <p className="text-base" style={{ color: 'var(--color-subtle)' }}>
          Manage and view statistics for all forms
        </p>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockForms.map((form) => (
          <Card
            key={form.id}
            onClick={() => handleCardClick(form.id)}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                borderColor: 'var(--color-brand-crimson)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Header with icon and menu */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(165, 28, 48, 0.1)' }}
                >
                  <DescriptionIcon sx={{ color: 'var(--color-brand-crimson)', fontSize: 20 }} />
                </div>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, form.id)}
                  sx={{
                    color: 'var(--color-subtle)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </div>

              {/* Title and Description */}
              <h3
                className="text-lg font-bold mb-2 line-clamp-2 normal-case"
                style={{ color: 'var(--color-heading)', minHeight: '3.5rem' }}
              >
                {form.title}
              </h3>
              <p
                className="text-sm mb-4 line-clamp-2"
                style={{ color: 'var(--color-subtle)', minHeight: '2.5rem' }}
              >
                {form.description}
              </p>

              {/* Status Badge */}
              <div className="mb-3">
                <Chip
                  label={form.status}
                  size="small"
                  sx={{
                    backgroundColor: `${getStatusColor(form.status)}15`,
                    color: getStatusColor(form.status),
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                    Responses
                  </p>
                  <p className="text-lg font-bold" style={{ color: 'var(--color-brand-crimson)' }}>
                    {form.responses}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                    Last modified
                  </p>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-body)' }}>
                    {new Date(form.lastModified).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl.element}
        open={Boolean(anchorEl.element)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleViewStats} sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
          View Statistics
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
          Toggle Status
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-brand-red)' }}
        >
          Delete Form
        </MenuItem>
      </Menu>
    </div>
  );
}

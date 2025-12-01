'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  nationality: string;
  status: string;
  admissionDate: string;
}

// Mock data
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'María García',
    age: 28,
    gender: 'Female',
    nationality: 'Venezuela',
    status: 'Active',
    admissionDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    age: 35,
    gender: 'Male',
    nationality: 'Honduras',
    status: 'Active',
    admissionDate: '2024-02-10',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    age: 42,
    gender: 'Female',
    nationality: 'El Salvador',
    status: 'Completed',
    admissionDate: '2023-12-05',
  },
  {
    id: '4',
    name: 'José López',
    age: 31,
    gender: 'Male',
    nationality: 'Guatemala',
    status: 'Active',
    admissionDate: '2024-03-01',
  },
  {
    id: '5',
    name: 'Lucía Hernández',
    age: 26,
    gender: 'Female',
    nationality: 'Nicaragua',
    status: 'Pending',
    admissionDate: '2024-03-20',
  },
  {
    id: '6',
    name: 'Pedro Sánchez',
    age: 39,
    gender: 'Male',
    nationality: 'Colombia',
    status: 'Active',
    admissionDate: '2024-02-28',
  },
  {
    id: '7',
    name: 'Carmen Flores',
    age: 33,
    gender: 'Female',
    nationality: 'Ecuador',
    status: 'Completed',
    admissionDate: '2023-11-18',
  },
  {
    id: '8',
    name: 'Miguel Torres',
    age: 45,
    gender: 'Male',
    nationality: 'Peru',
    status: 'Active',
    admissionDate: '2024-01-22',
  },
];

export default function PatientsTable() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; patientId: string | null }>({
    open: false,
    patientId: null,
  });

  // Filter patients
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.nationality.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    const matchesGender = genderFilter === 'All' || patient.gender === genderFilter;

    return matchesSearch && matchesStatus && matchesGender;
  });

  const handleViewHistory = (patientId: string) => {
    router.push(`/patients/${patientId}`);
  };

  const handleDeleteClick = (patientId: string) => {
    setDeleteDialog({ open: true, patientId });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.patientId) {
      setPatients((prev) => prev.filter((p) => p.id !== deleteDialog.patientId));
      setDeleteDialog({ open: false, patientId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, patientId: null });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'var(--color-brand-blue)';
      case 'Completed':
        return 'var(--color-success)';
      case 'Pending':
        return 'var(--color-brand-yellow)';
      default:
        return 'var(--color-subtle)';
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="card-harvard p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField
            fullWidth
            label="Search by name or nationality"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'var(--color-subtle)' }} />,
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
            select
            fullWidth
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
          >
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Gender"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
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
          >
            <MenuItem value="All">All Genders</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
        </div>
      </div>

      {/* Mobile Cards - visible only on small screens */}
      <div className="block md:hidden space-y-4">
        {filteredPatients.length === 0 ? (
          <div className="card-harvard p-8 text-center">
            <p className="text-base" style={{ color: 'var(--color-subtle)' }}>
              No patients found matching your filters.
            </p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="card-harvard p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1 truncate" style={{ color: 'var(--color-heading)' }}>
                    {patient.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--color-subtle)' }}>
                    {patient.age} years • {patient.gender}
                  </p>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2"
                  style={{
                    backgroundColor: `${getStatusColor(patient.status)}15`,
                    color: getStatusColor(patient.status),
                  }}
                >
                  {patient.status}
                </span>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-200">
                <p className="text-sm" style={{ color: 'var(--color-body)' }}>
                  <span className="font-semibold">Nationality: </span>
                  {patient.nationality}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--color-body)' }}>
                  <span className="font-semibold">Admission: </span>
                  {new Date(patient.admissionDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewHistory(patient.id)}
                  sx={{
                    backgroundColor: 'var(--color-brand-blue)',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    '&:hover': {
                      backgroundColor: '#046599',
                    },
                  }}
                >
                  View History
                </Button>
                <IconButton
                  onClick={() => handleDeleteClick(patient.id)}
                  sx={{
                    color: 'var(--color-brand-red)',
                    border: '1px solid var(--color-brand-red)',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(235, 0, 27, 0.08)',
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table - hidden on small screens */}
      <div className="hidden md:block card-harvard overflow-hidden">
        <TableContainer component={Paper} elevation={0} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--color-bg-subtle)' }}>
                <TableCell sx={{ fontWeight: 700, color: 'var(--color-heading)' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'var(--color-heading)' }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'var(--color-heading)' }}>Gender</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'var(--color-heading)' }}>
                  Nationality
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'var(--color-heading)' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'var(--color-heading)' }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <p className="text-base" style={{ color: 'var(--color-subtle)' }}>
                      No patients found matching your filters.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.nationality}</TableCell>
                    <TableCell>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getStatusColor(patient.status)}15`,
                          color: getStatusColor(patient.status),
                        }}
                      >
                        {patient.status}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip
                        title="View History"
                        slotProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: 'var(--color-brand-yellow)',
                              color: '#000',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              padding: '8px 12px',
                              fontFamily: 'var(--font-trueno)',
                            },
                          },
                        }}
                      >
                        <IconButton
                          onClick={() => handleViewHistory(patient.id)}
                          size="small"
                          sx={{
                            color: 'var(--color-brand-yellow)',
                            '&:hover': {
                              backgroundColor: 'rgba(248, 194, 28, 0.12)',
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="Delete"
                        slotProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: 'var(--color-brand-red)',
                              color: '#fff',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              padding: '8px 12px',
                              fontFamily: 'var(--font-trueno)',
                            },
                          },
                        }}
                      >
                        <IconButton
                          onClick={() => handleDeleteClick(patient.id)}
                          size="small"
                          sx={{
                            color: 'var(--color-brand-red)',
                            '&:hover': {
                              backgroundColor: 'rgba(235, 0, 27, 0.08)',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
        <DialogTitle sx={{ color: 'var(--color-heading)' }}>Delete Patient</DialogTitle>
        <DialogContent>
          <p style={{ color: 'var(--color-body)' }}>
            Are you sure you want to delete this patient? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={handleDeleteCancel}
            sx={{
              color: 'var(--color-body)',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              backgroundColor: 'var(--color-brand-red)',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#C4001B',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

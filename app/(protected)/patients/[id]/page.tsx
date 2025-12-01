import Link from 'next/link';
import { IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

// Mock patient data - in real app this would come from database
const mockPatientData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'María García',
    age: 28,
    gender: 'Female',
    nationality: 'Venezuela',
    status: 'Active',
    admissionDate: '2024-01-15',
    contactNumber: '+1 (555) 123-4567',
    email: 'maria.garcia@email.com',
    address: '123 Main Street, Boston, MA 02118',
    emergencyContact: 'Juan García - +1 (555) 987-6543',
    medicalHistory: [
      {
        date: '2024-03-15',
        type: 'Consultation',
        description: 'General health checkup. Patient reported mild headaches.',
        provider: 'Dr. Smith',
      },
      {
        date: '2024-02-20',
        type: 'Treatment',
        description: 'Administered vitamin supplements for reported fatigue.',
        provider: 'Dr. Johnson',
      },
      {
        date: '2024-01-15',
        type: 'Initial Assessment',
        description: 'First visit. Comprehensive health screening completed.',
        provider: 'Dr. Smith',
      },
    ],
    notes: 'Patient is cooperative and follows treatment plan. Requires follow-up in 2 weeks.',
  },
  '2': {
    id: '2',
    name: 'Carlos Rodríguez',
    age: 35,
    gender: 'Male',
    nationality: 'Honduras',
    status: 'Active',
    admissionDate: '2024-02-10',
    contactNumber: '+1 (555) 234-5678',
    email: 'carlos.rodriguez@email.com',
    address: '456 Oak Avenue, Boston, MA 02119',
    emergencyContact: 'Ana Rodríguez - +1 (555) 876-5432',
    medicalHistory: [
      {
        date: '2024-03-10',
        type: 'Follow-up',
        description: 'Blood pressure check. Levels are stable.',
        provider: 'Dr. Martinez',
      },
      {
        date: '2024-02-10',
        type: 'Initial Assessment',
        description: 'First visit. Patient has history of hypertension.',
        provider: 'Dr. Martinez',
      },
    ],
    notes: 'Monitor blood pressure regularly. Patient is on medication.',
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PatientHistoryPage({ params }: PageProps) {
  const { id } = await params;
  const patient = mockPatientData[id];

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
          Patient Not Found
        </h1>
        <Link href="/patients" className="text-base" style={{ color: 'var(--color-brand-crimson)' }}>
          Return to Patients List
        </Link>
      </div>
    );
  }

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
    <div>
      {/* Breadcrumbs */}
      <div className="mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-lora)' }}>
        <Link
          href="/patients"
          className="text-sm font-medium hover:underline"
          style={{ color: 'var(--color-brand-crimson)' }}
        >
          Patients
        </Link>
        <span style={{ color: 'var(--color-subtle)' }}>/</span>
        <span className="text-sm font-medium truncate" style={{ color: 'var(--color-subtle)' }}>
          Patient History
        </span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 normal-case" style={{ color: 'var(--color-brand-crimson)' }}>
          Patient History
        </h1>
        <p className="text-sm md:text-base" style={{ color: 'var(--color-subtle)' }}>
          Detailed medical record and history
        </p>
      </div>

      <div className="space-y-6">
        {/* Patient Information Card */}
        <div className="card-harvard p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <h2 className="text-lg md:text-xl font-bold normal-case" style={{ color: 'var(--color-heading)' }}>
              Patient Information
            </h2>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold self-start"
              style={{
                backgroundColor: `${getStatusColor(patient.status)}15`,
                color: getStatusColor(patient.status),
              }}
            >
              {patient.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-subtle)' }}>
                Full Name
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                {patient.name}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-subtle)' }}>
                Age
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                {patient.age} years
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-subtle)' }}>
                Gender
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                {patient.gender}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-subtle)' }}>
                Nationality
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                {patient.nationality}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-subtle)' }}>
                Contact Number
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                {patient.contactNumber}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-subtle)' }}>
                Email
              </p>
              <p className="text-base font-semibold break-words" style={{ color: 'var(--color-heading)' }}>
                {patient.email}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-subtle)' }}>
                Address
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                {patient.address}
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-subtle)' }}>
                Emergency Contact
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                {patient.emergencyContact}
              </p>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="card-harvard p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 normal-case" style={{ color: 'var(--color-heading)' }}>
            Medical History
          </h2>

          <div className="space-y-4">
            {patient.medicalHistory.map((record: any, index: number) => (
              <div
                key={index}
                className="border-l-4 pl-4 md:pl-6 py-3 md:py-4 relative"
                style={{ borderColor: 'var(--color-brand-crimson)' }}
              >
                <div
                  className="absolute w-3 h-3 rounded-full -left-[7px] top-5 md:top-6"
                  style={{ backgroundColor: 'var(--color-brand-crimson)' }}
                />
                <div className="flex flex-col gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: 'rgba(5, 121, 184, 0.1)',
                        color: 'var(--color-brand-blue)',
                      }}
                    >
                      {record.type}
                    </span>
                    <p className="text-xs md:text-sm" style={{ color: 'var(--color-subtle)' }}>
                      {new Date(record.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm font-medium" style={{ color: 'var(--color-brand-crimson)' }}>
                    {record.provider}
                  </p>
                </div>
                <p className="text-sm md:text-base" style={{ color: 'var(--color-body)' }}>
                  {record.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="card-harvard p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 normal-case" style={{ color: 'var(--color-heading)' }}>
            Additional Notes
          </h2>
          <p className="text-sm md:text-base" style={{ color: 'var(--color-body)' }}>
            {patient.notes}
          </p>
        </div>
      </div>
    </div>
  );
}

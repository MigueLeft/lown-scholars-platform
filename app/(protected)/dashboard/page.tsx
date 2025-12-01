import Link from 'next/link';
import { Chip } from '@mui/material';
import { TrendingUp, People, Description, CheckCircle } from '@mui/icons-material';

export default function DashboardPage() {
    // Mock data based on actual patient system
    const stats = {
        totalPatients: 8,
        activePatients: 5,
        pendingPatients: 1,
        completedCases: 2,
    };

    const recentPatients = [
        { name: 'Lucía Hernández', status: 'Pending', date: '2024-03-20', nationality: 'Nicaragua' },
        { name: 'Miguel Torres', status: 'Active', date: '2024-01-22', nationality: 'Peru' },
        { name: 'Pedro Sánchez', status: 'Active', date: '2024-02-28', nationality: 'Colombia' },
        { name: 'Ana Martínez', status: 'Completed', date: '2023-12-05', nationality: 'El Salvador' },
    ];

    const nationalityStats = [
        { country: 'Venezuela', count: 1 },
        { country: 'Honduras', count: 1 },
        { country: 'Guatemala', count: 1 },
        { country: 'El Salvador', count: 1 },
        { country: 'Nicaragua', count: 1 },
        { country: 'Colombia', count: 1 },
        { country: 'Ecuador', count: 1 },
        { country: 'Peru', count: 1 },
    ];

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
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2 normal-case" style={{ color: 'var(--color-brand-crimson)' }}>
                    Dashboard
                </h1>
                <p className="text-base" style={{ color: 'var(--color-subtle)' }}>
                    Welcome back! Here&apos;s an overview of your data.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                <div className="card-harvard p-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium" style={{ color: 'var(--color-subtle)' }}>
                            Total Patients
                        </p>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(165, 28, 48, 0.1)' }}>
                            <People sx={{ color: 'var(--color-brand-crimson)', fontSize: 20 }} />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-1" style={{ color: 'var(--color-brand-crimson)' }}>
                        {stats.totalPatients}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                        Registered in system
                    </p>
                </div>

                <div className="card-harvard p-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium" style={{ color: 'var(--color-subtle)' }}>
                            Active Patients
                        </p>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(5, 121, 184, 0.1)' }}>
                            <CheckCircle sx={{ color: 'var(--color-brand-blue)', fontSize: 20 }} />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-1" style={{ color: 'var(--color-brand-blue)' }}>
                        {stats.activePatients}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                        Currently receiving care
                    </p>
                </div>

                <div className="card-harvard p-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium" style={{ color: 'var(--color-subtle)' }}>
                            Pending Cases
                        </p>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(248, 194, 28, 0.1)' }}>
                            <TrendingUp sx={{ color: 'var(--color-brand-yellow)', fontSize: 20 }} />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-1" style={{ color: 'var(--color-brand-yellow)' }}>
                        {stats.pendingPatients}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                        Awaiting initial assessment
                    </p>
                </div>

                <div className="card-harvard p-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium" style={{ color: 'var(--color-subtle)' }}>
                            Completed Cases
                        </p>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 128, 0, 0.1)' }}>
                            <CheckCircle sx={{ color: 'var(--color-success)', fontSize: 20 }} />
                        </div>
                    </div>
                    <p className="text-4xl font-bold mb-1" style={{ color: 'var(--color-success)' }}>
                        {stats.completedCases}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                        Successfully discharged
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Recent Patients */}
                <div className="card-harvard p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold normal-case" style={{ color: 'var(--color-heading)' }}>
                            Recent Patients
                        </h2>
                        <Link href="/patients" className="text-sm font-medium hover:underline" style={{ color: 'var(--color-brand-crimson)' }}>
                            View all
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentPatients.map((patient, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm mb-1 truncate" style={{ color: 'var(--color-heading)' }}>
                                        {patient.name}
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                                        {patient.nationality} • {new Date(patient.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                                <Chip
                                    label={patient.status}
                                    size="small"
                                    sx={{
                                        backgroundColor: `${getStatusColor(patient.status)}15`,
                                        color: getStatusColor(patient.status),
                                        fontWeight: 600,
                                        fontSize: '0.7rem',
                                        alignSelf: 'flex-start',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nationality Distribution */}
                <div className="card-harvard p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold normal-case" style={{ color: 'var(--color-heading)' }}>
                            Nationality Distribution
                        </h2>
                    </div>
                    <div className="space-y-3 max-h-[280px] overflow-y-auto">
                        {nationalityStats.map((stat, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-brand-blue)' }}>
                                        {stat.count}
                                    </div>
                                    <p className="font-semibold text-sm truncate" style={{ color: 'var(--color-heading)' }}>
                                        {stat.country}
                                    </p>
                                </div>
                                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden ml-2">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${(stat.count / stats.totalPatients) * 100}%`,
                                            backgroundColor: 'var(--color-brand-crimson)',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

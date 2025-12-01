import PatientsTable from '@/components/patients/PatientsTable';

export default function PatientsPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2 normal-case" style={{ color: 'var(--color-brand-crimson)' }}>
                    Patients
                </h1>
                <p className="text-base" style={{ color: 'var(--color-subtle)' }}>
                    Manage and view all patient records.
                </p>
            </div>

            <PatientsTable />
        </div>
    );
}

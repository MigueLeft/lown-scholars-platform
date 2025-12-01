export default function StatisticsPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2 normal-case" style={{ color: 'var(--color-brand-crimson)' }}>
                    Statistics
                </h1>
                <p className="text-base" style={{ color: 'var(--color-subtle)' }}>
                    View analytics and reports.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Chart Placeholder 1 */}
                <div className="card-harvard p-6">
                    <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
                        Patient Demographics
                    </h2>
                    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                        <p className="text-sm" style={{ color: 'var(--color-subtle)' }}>
                            Chart placeholder
                        </p>
                    </div>
                </div>

                {/* Chart Placeholder 2 */}
                <div className="card-harvard p-6">
                    <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
                        Monthly Trends
                    </h2>
                    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                        <p className="text-sm" style={{ color: 'var(--color-subtle)' }}>
                            Chart placeholder
                        </p>
                    </div>
                </div>

                {/* Chart Placeholder 3 */}
                <div className="card-harvard p-6">
                    <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
                        Service Distribution
                    </h2>
                    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                        <p className="text-sm" style={{ color: 'var(--color-subtle)' }}>
                            Chart placeholder
                        </p>
                    </div>
                </div>

                {/* Chart Placeholder 4 */}
                <div className="card-harvard p-6">
                    <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
                        Case Status Overview
                    </h2>
                    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                        <p className="text-sm" style={{ color: 'var(--color-subtle)' }}>
                            Chart placeholder
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

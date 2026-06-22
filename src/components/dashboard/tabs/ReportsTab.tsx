'use client';

import AttendanceChart from '@/components/dashboard/AttendanceChart';

export default function ReportsTab({ data }: { data: any }) {
  const { role, chartData, totalHours, avgHoursPerDay } = data;

  if (role === 'employee') return null;

  return (
    <div style={{ padding: '1rem 0' }}>
      <h1 style={{ marginBottom: '1rem' }}>Executive Analytics</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        {role === 'ceo' ? 'Organization-wide velocity and health metrics.' : 'Squad-level performance and tracking.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{Math.round(totalHours)}</div>
          <div style={{ color: 'var(--text-secondary)' }}>Total Hours Logged (30 Days)</div>
        </div>
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981' }}>{avgHoursPerDay}</div>
          <div style={{ color: 'var(--text-secondary)' }}>Avg Hours / Active Day</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Attendance Velocity</h3>
        <AttendanceChart data={chartData} />
      </div>
    </div>
  );
}

'use client';

import EmployeeView from '@/components/attendance/EmployeeView';
import TeamView from '@/components/attendance/TeamView';
import ExecutiveAnalytics from '@/components/attendance/ExecutiveAnalytics';

export default function AttendanceTab({ data }: { data: any }) {
  const { role, user, history, activeLog } = data;

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0' }}>Attendance Portal</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Logged in as <strong>{user.email}</strong> ({role.toUpperCase()})
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Everyone gets to see their own clock-in widget */}
        <EmployeeView userId={user.id} initialHistory={history} initialActiveLog={activeLog} />

        {/* Render specific components based on role */}
        {(role === 'tl' || role === 'manager' || role === 'ceo') && (
          <TeamView isManager={role === 'manager' || role === 'ceo'} />
        )}

        {(role === 'ceo') && (
          <ExecutiveAnalytics />
        )}
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import { getAttendanceReport } from '@/actions/report.actions';
import AttendanceChart from '@/components/dashboard/AttendanceChart';

export default async function ReportsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  if (!token) redirect('/login');
  const user: any = await verifyToken(token);
  if (!user || user.role === 'employee') redirect('/dashboard'); // Employees cannot access reports

  const chartData = await getAttendanceReport();
  
  // Calculate some basic stats
  const totalHours = chartData.reduce((sum, day) => sum + day.hours, 0);
  const avgHoursPerDay = chartData.length ? (totalHours / chartData.length).toFixed(1) : 0;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '1rem' }}>Executive Analytics</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        {user.role === 'ceo' ? 'Organization-wide velocity and health metrics.' : 'Squad-level performance and tracking.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{totalHours}</div>
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

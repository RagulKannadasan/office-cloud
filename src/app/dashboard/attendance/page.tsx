import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import EmployeeView from '@/components/attendance/EmployeeView';
import TeamView from '@/components/attendance/TeamView';
import ExecutiveAnalytics from '@/components/attendance/ExecutiveAnalytics';
import { getMyHistory, getActiveLog } from '@/actions/attendance.actions';

export default async function AttendancePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  if (!token) redirect('/login');
  
  const user: any = await verifyToken(token);
  if (!user || !user.id) redirect('/login');

  const role = user.role || 'employee';

  const history = await getMyHistory(user.id);
  const activeLog = await getActiveLog(user.id);

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <nav style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Attendance Portal</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Logged in as <strong>{user.email}</strong> ({role.toUpperCase()})
          </p>
        </div>
        <Link href="/dashboard" className="btn btn-outline">Back to Dashboard</Link>
      </nav>

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

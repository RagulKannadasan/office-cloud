import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import Link from 'next/link';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  if (!token) redirect('/login');
  
  const user: any = await verifyToken(token);
  if (!user) redirect('/login');

  const role = user.role || 'employee';

  // Sign out action
  async function signOut() {
    'use server'
    const cookieStore = await cookies();
    cookieStore.delete('session_token');
    redirect('/login');
  }

  return (
    <>
      <nav className="container nav">
        <Link href="/" className="nav-logo">Office Cloud</Link>
        <div className="nav-links">
          <span style={{ color: 'var(--text-secondary)' }}>{user.email}</span>
          <form action={signOut}>
            <button type="submit" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Sign Out</button>
          </form>
        </div>
      </nav>
      <main className="container main-content" style={{ padding: '2rem 0' }}>
        <h1>Welcome back.</h1>
        <p className="hero-subtitle" style={{ textAlign: 'left' }}>
          Role Level: <strong style={{ textTransform: 'capitalize', color: 'var(--primary-color)' }}>{role}</strong>
        </p>

        <div className="dashboard-grid">
          {role === 'ceo' && (
            <>
              <div className="dashboard-card glass-panel">
                <h3 className="dashboard-card-title">Company Overview</h3>
                <p>Global financial analytics, overall project progression, and high-level health metrics.</p>
              </div>
              <div className="dashboard-card glass-panel">
                <h3 className="dashboard-card-title">Executive Reports</h3>
                <p>Access confidential strategic documents and burn rate analysis.</p>
              </div>
            </>
          )}

          {(role === 'ceo' || role === 'manager' || role === 'tl') && (
            <Link href="/dashboard/team" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="dashboard-card glass-panel" style={{ height: '100%', cursor: 'pointer' }}>
                <h3 className="dashboard-card-title">Team Management</h3>
                <p>{role === 'tl' ? 'Monitor your squad and interact with members.' : 'Manage employee resources, assign TLs, and structure teams.'}</p>
              </div>
            </Link>
          )}

          {(role === 'ceo' || role === 'manager' || role === 'tl') && (
            <div className="dashboard-card glass-panel">
              <h3 className="dashboard-card-title">Project Workflows</h3>
              <p>Kanban boards, sprint planning, and task allocations.</p>
            </div>
          )}

          <div className="dashboard-card glass-panel">
            <h3 className="dashboard-card-title">My Tasks</h3>
            <p>View your assigned tickets, upcoming deadlines, and daily standup notes.</p>
          </div>
          
          <Link href="/dashboard/attendance" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card glass-panel" style={{ height: '100%', cursor: 'pointer' }}>
              <h3 className="dashboard-card-title">Attendance & Timesheets</h3>
              <p>Check in/out, view timesheets, and apply for leaves.</p>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}

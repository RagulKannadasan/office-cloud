import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

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
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <ThemeToggle />
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
            <Link href="/dashboard/reports" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="dashboard-card glass-panel" style={{ height: '100%', cursor: 'pointer' }}>
                <h3 className="dashboard-card-title">Executive Analytics</h3>
                <p>Global financial analytics, overall project progression, and high-level health metrics.</p>
              </div>
            </Link>
          )}

          {(role === 'ceo' || role === 'manager') && (
            <Link href="/dashboard/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="dashboard-card glass-panel" style={{ height: '100%', cursor: 'pointer', border: '1px solid var(--primary-color)' }}>
                <h3 className="dashboard-card-title">App Admin (CMS)</h3>
                <p>Manage core application settings and public landing page content.</p>
              </div>
            </Link>
          )}

          {(role === 'manager' || role === 'tl') && (
            <Link href="/dashboard/reports" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="dashboard-card glass-panel" style={{ height: '100%', cursor: 'pointer' }}>
                <h3 className="dashboard-card-title">Squad Reports</h3>
                <p>View aggregated attendance logs and velocity metrics for your direct reports.</p>
              </div>
            </Link>
          )}

          {(role === 'ceo' || role === 'manager' || role === 'tl') && (
            <Link href="/dashboard/team" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="dashboard-card glass-panel" style={{ height: '100%', cursor: 'pointer' }}>
                <h3 className="dashboard-card-title">Team Management</h3>
                <p>{role === 'tl' ? 'Monitor your squad and interact with members.' : 'Manage employee resources, assign TLs, and structure teams.'}</p>
              </div>
            </Link>
          )}

          <Link href="/dashboard/directory" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card glass-panel" style={{ height: '100%', cursor: 'pointer' }}>
              <h3 className="dashboard-card-title">Employee Directory</h3>
              <p>Search colleagues, view roles, and find squad assignments across the organization.</p>
            </div>
          </Link>

          <Link href="/dashboard/attendance" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card glass-panel" style={{ height: '100%', cursor: 'pointer' }}>
              <h3 className="dashboard-card-title">Attendance</h3>
              <p>Check in/out and view your personal timesheets.</p>
            </div>
          </Link>

          <Link href="/dashboard/leave" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card glass-panel" style={{ height: '100%', cursor: 'pointer' }}>
              <h3 className="dashboard-card-title">Leave Management</h3>
              <p>{role === 'employee' ? 'Request time off and track status.' : 'Approve/deny squad requests and manage your own.'}</p>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}

import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import ManagerTeamView from '@/components/team/ManagerTeamView';
import TLTeamView from '@/components/team/TLTeamView';
import { getCompanyDirectory, getSquad, getPendingUsers } from '@/actions/user.actions';

export default async function TeamPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  if (!token) redirect('/login');
  
  const user: any = await verifyToken(token);
  if (!user || !user.id) redirect('/login');

  const role = user.role || 'employee';

  if (role === 'employee') {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>Access Denied</h2>
        <p style={{ color: 'var(--text-secondary)' }}>You do not have permission to access the team management portal.</p>
        <Link href="/dashboard" className="btn" style={{ marginTop: '2rem' }}>Back to Dashboard</Link>
      </div>
    );
  }

  let members: any[] = [];
  let squad: any[] = [];
  let pendingUsers: any[] = [];

  if (role === 'manager' || role === 'ceo') {
    members = await getCompanyDirectory();
    pendingUsers = await getPendingUsers();
  } else if (role === 'tl') {
    squad = await getSquad(user.id);
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <nav style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Team Management</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Logged in as <strong>{user.email}</strong> ({role.toUpperCase()})
          </p>
        </div>
        <Link href="/dashboard" className="btn btn-outline">Back to Dashboard</Link>
      </nav>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {(role === 'manager' || role === 'ceo') ? (
          <ManagerTeamView initialMembers={members} pendingUsers={pendingUsers} />
        ) : (
          <TLTeamView squad={squad} />
        )}
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import { prisma } from '@/lib/prisma';

export default async function DirectoryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  if (!token) redirect('/login');
  const user: any = await verifyToken(token);
  if (!user) redirect('/login');

  const users = await prisma.user.findMany({
    orderBy: { role: 'asc' },
    include: {
      teamLeader: { select: { email: true, name: true } }
    }
  });

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Company Directory</h1>
      
      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Employee</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Role</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Department</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Manager/TL</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 600 }}>{u.name || 'Unnamed Employee'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{u.email}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    textTransform: 'capitalize',
                    background: u.role === 'ceo' ? 'rgba(99,102,241,0.2)' : 
                                u.role === 'manager' ? 'rgba(16,185,129,0.2)' : 
                                u.role === 'tl' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.1)',
                    color: u.role === 'ceo' ? '#a5b4fc' : 
                           u.role === 'manager' ? '#34d399' : 
                           u.role === 'tl' ? '#fbbf24' : 'white'
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{u.department || '—'}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                  {u.teamLeader ? u.teamLeader.email : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

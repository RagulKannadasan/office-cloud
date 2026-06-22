'use client';

import ManagerTeamView from '@/components/team/ManagerTeamView';
import TLTeamView from '@/components/team/TLTeamView';

export default function TeamTab({ data }: { data: any }) {
  const { role, companyDirectory, pendingUsers, squad } = data;

  if (role === 'employee') return null;

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0' }}>Team Management</h1>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {role === 'tl' && data.squad && <TLTeamView squad={data.squad} />}
        {(role === 'manager' || role === 'ceo') && (
          !data.pendingUsers ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading Team Data...</div>
          ) : (
            <ManagerTeamView initialMembers={data.companyDirectory} pendingUsers={data.pendingUsers} />
          )
        )}
      </div>
    </div>
  );
}

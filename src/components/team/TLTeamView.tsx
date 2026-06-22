'use client';

export default function TLTeamView({ squad }: { squad: any[] }) {

  const handleAction = (action: string, name: string) => {
    alert(`${action} triggered for ${name}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2>My Squad</h2>
      
      <div className="glass-panel">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Email</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Department</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Interact</th>
            </tr>
          </thead>
          <tbody>
            {squad.map(member => (
              <tr key={member.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 600 }}>{member.name}</div>
                  {member.employeeId && <div style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>{member.employeeId}</div>}
                </td>
                <td style={{ padding: '1rem' }}>{member.email}</td>
                <td style={{ padding: '1rem' }}>{member.department || 'N/A'}</td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => handleAction('View Attendance', member.name)}>Attendance</button>
                  <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => handleAction('Assign Task', member.name)}>Task</button>
                  <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => handleAction('Request Report', member.name)}>Report</button>
                </td>
              </tr>
            ))}
            {squad.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>You have no members in your squad yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';

export default function TeamView({ isManager = false }) {
  const team = [
    { name: 'Sarah Connor', role: 'Frontend Dev', status: 'Online', lastActive: 'Just now' },
    { name: 'John Smith', role: 'Backend Dev', status: 'On Break', lastActive: '15 mins ago' },
    { name: 'Alice Wong', role: 'UI Designer', status: 'Offline', lastActive: 'Yesterday' },
    { name: 'David Kim', role: 'DevOps', status: 'Online', lastActive: 'Just now' },
  ];

  return (
    <div className="glass-panel">
      <h3 style={{ marginBottom: '1.5rem' }}>{isManager ? 'Department Status' : 'Team Roster'}</h3>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {team.map((member, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0' }}>{member.name}</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{member.role}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: member.status === 'Online' ? '#4ade80' : member.status === 'On Break' ? '#fbbf24' : '#9ca3af'
              }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: 'currentColor' 
                }} />
                <span style={{ fontWeight: 500 }}>{member.status}</span>
              </div>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {member.lastActive}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {isManager && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <h4>Pending Leave Requests (2)</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Review pending PTO and sick leaves.</p>
          <button className="btn btn-outline" style={{ marginTop: '0.5rem' }}>Review Requests</button>
        </div>
      )}
    </div>
  );
}

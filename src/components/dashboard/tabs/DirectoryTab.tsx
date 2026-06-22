'use client';

export default function DirectoryTab({ data }: { data: any }) {
  const users = data.companyDirectory || [];

  const tls = users.filter((u: any) => u.role === 'tl');
  const hr = users.filter((u: any) => u.role === 'hr' || (u.department && u.department.toLowerCase() === 'hr'));
  const employees = users.filter((u: any) => u.role === 'employee' && (!u.department || u.department.toLowerCase() !== 'hr'));
  
  // Group by department for "Projects / Departments"
  const departments = users.reduce((acc: any, user: any) => {
    const dept = user.department || 'Unassigned';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(user);
    return acc;
  }, {});

  const UserTable = ({ usersList, title }: { usersList: any[], title: string }) => {
    if (usersList.length === 0) return null;
    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>{title} ({usersList.length})</h3>
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
              {usersList.map((u: any) => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600 }}>{u.name || 'Unnamed Employee'}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {u.employeeId && <span style={{ marginRight: '8px', color: 'var(--primary-color)' }}>{u.employeeId}</span>}
                      {u.email}
                    </div>
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
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      <h2 style={{ marginBottom: '2rem' }}>Company Directory</h2>
      
      {/* Role-based Tables */}
      <UserTable usersList={tls} title="Team Leaders (TL)" />
      <UserTable usersList={hr} title="Human Resources (HR)" />
      <UserTable usersList={employees} title="General Employees" />

      {/* Projects / Departments Grid */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Projects & Departments</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {Object.entries(departments).map(([dept, deptUsers]: [string, any]) => (
            <div key={dept} className="glass-panel">
              <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>{dept}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>
                  {deptUsers.length} member{deptUsers.length !== 1 ? 's' : ''}
                </span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {deptUsers.map((u: any) => (
                  <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{u.name || 'Unnamed'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{u.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

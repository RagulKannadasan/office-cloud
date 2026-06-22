'use client';

import AttendanceChart from '@/components/dashboard/AttendanceChart';

export default function OverviewTab({ data, setActiveTab }: { data: any, setActiveTab: (tab: string) => void }) {
  const { role, user } = data;

  return (
    <>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Welcome back, {user.name || user.email.split('@')[0]}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Here is what's happening {role === 'ceo' ? 'across the organization' : role === 'employee' ? 'with your timesheets' : 'with your squad'} today.
        </p>
      </div>

      {(role === 'ceo' || role === 'manager' || role === 'tl') ? (
        <>
          {/* LEADERSHIP ANALYTICS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total {role === 'tl' ? 'Squad' : 'Org'} Members</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{data.totalMembers}</div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Hours (30d)</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{Math.round(data.totalHours)}h</div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Avg Velocity / Day</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{data.avgHoursPerDay}h</div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Pending Leaves</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: data.pendingLeavesCount > 0 ? '#f59e0b' : 'var(--text-primary)' }}>{data.pendingLeavesCount}</div>
              {data.pendingLeavesCount > 0 && (
                <button onClick={() => setActiveTab('leave')} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>Review →</button>
              )}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>Attendance Velocity</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>30-day trailing hours logged.</p>
              </div>
              <button onClick={() => setActiveTab('reports')} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Full Report</button>
            </div>
            <AttendanceChart data={data.chartData} />
          </div>
        </>
      ) : (
        <>
          {/* EMPLOYEE ANALYTICS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Status</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: data.activeLog ? '#10b981' : 'var(--text-secondary)' }}>
                {data.activeLog ? '🟢 Clocked In' : '⚪ Offline'}
              </div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hours Logged (30d)</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{Math.round(data.myRecentHours * 10) / 10}h</div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Leaves</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{data.myActiveLeaveCount}</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setActiveTab('attendance')} className="btn" style={{ flex: 1, padding: '1.5rem', fontSize: '1.1rem' }}>
                {data.activeLog ? 'Go to Clock Out' : 'Start Shift'}
              </button>
              <button onClick={() => setActiveTab('leave')} className="btn btn-outline" style={{ flex: 1, padding: '1.5rem', fontSize: '1.1rem' }}>
                Request Time Off
              </button>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>My Personal Velocity</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Your trailing 30-day hours logged.</p>
              </div>
            </div>
            <AttendanceChart data={data.chartData} />
          </div>
        </>
      )}
    </>
  );
}

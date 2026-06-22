'use client';

export default function ExecutiveAnalytics() {
  const stats = [
    { label: 'Total Workforce', value: '142', trend: '+3 this month' },
    { label: 'Daily Active', value: '135', trend: '95% Attendance' },
    { label: 'On Leave', value: '7', trend: 'Normal range' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
              {stat.label}
            </p>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>{stat.value}</h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#4ade80' }}>{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel">
        <h3 style={{ marginBottom: '1.5rem' }}>Weekly Attendance Trend</h3>
        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {[95, 96, 92, 98, 90].map((height, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '100%', 
                height: `${height}%`, 
                backgroundColor: 'var(--primary)',
                borderRadius: '4px 4px 0 0',
                opacity: height > 95 ? 1 : 0.7
              }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

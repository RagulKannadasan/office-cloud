export default function FeaturesGrid() {
  const features = [
    {
      title: "Role-Based Access",
      desc: "Strictly enforced security boundaries. CEOs see analytics, Managers handle assignments, and Team Leaders monitor squads.",
      icon: "🛡️"
    },
    {
      title: "Real-Time Attendance",
      desc: "Instant clock-in/out syncing. Track active hours, breaks, and daily completion logs directly from the dashboard.",
      icon: "⏱️"
    },
    {
      title: "Executive Analytics",
      desc: "High-level KPI dashboards designed for the C-Suite. Visualize workforce trends and project burn rates at a glance.",
      icon: "📈"
    },
    {
      title: "Squad Management",
      desc: "Granular control for Team Leaders. Assign tasks, view direct reports, and optimize the velocity of your engineering squads.",
      icon: "👥"
    }
  ];

  return (
    <section id="features" style={{ padding: '6rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Engineered for Scale</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Everything you need to orchestrate a distributed software company, built securely on a blazingly fast Next.js architecture.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {features.map((feature, idx) => (
          <div key={idx} className="glass-panel feature-card" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            cursor: 'default'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              width: '50px', 
              height: '50px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px'
            }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

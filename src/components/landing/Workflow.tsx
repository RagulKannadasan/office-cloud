export default function Workflow() {
  const steps = [
    {
      num: "01",
      title: "Secure Login",
      desc: "Authenticate via magic link. The system automatically registers you and verifies your credentials against the central DB."
    },
    {
      num: "02",
      title: "Auto-Assignment",
      desc: "Based on predefined company logic, you are instantly routed to your specific Executive, Manager, or Employee dashboard."
    },
    {
      num: "03",
      title: "Real-Time Tracking",
      desc: "Begin clocking hours, reviewing attendance sheets, or viewing organization-wide analytics without any setup delay."
    }
  ];

  return (
    <section style={{ padding: '6rem 1rem', background: 'rgba(0,0,0,0.2)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Frictionless Onboarding</h2>
          <p style={{ color: 'var(--text-secondary)' }}>From initial deployment to daily operations in three simple steps.</p>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '2rem' 
        }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '2rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              padding: '2rem',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Giant background number */}
              <div style={{
                position: 'absolute',
                right: '-20px',
                top: '-20px',
                fontSize: '10rem',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.03)',
                lineHeight: 1,
                zIndex: 0
              }}>
                {step.num}
              </div>

              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--primary-color)',
                zIndex: 1,
                flexShrina: 0
              }}>
                {step.num}
              </div>
              <div style={{ zIndex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

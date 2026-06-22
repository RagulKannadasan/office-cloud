import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      textAlign: 'center', 
      padding: '6rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: -1
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '20%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(0,0,0,0) 70%)',
        zIndex: -1
      }}></div>

      <h1 style={{ 
        fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
        lineHeight: 1.1,
        marginBottom: '1.5rem',
        maxWidth: '800px',
        background: 'none', /* Override default global h1 */
        WebkitTextFillColor: 'initial' /* Override default global h1 */
      }}>
        Manage Your Team<br />
        <span className="animated-gradient-text">With Precision</span>
      </h1>
      
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '1.25rem',
        maxWidth: '600px',
        marginBottom: '3rem',
        lineHeight: 1.6
      }}>
        The zero-compromise workspace built exclusively for high-velocity software teams. Seamlessly integrate role-based access, attendance tracking, and executive analytics.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem' }}>
        <Link href="/login" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Access Workspace
        </Link>
        <a href="#features" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
          Explore Features
        </a>
      </div>

      {/* Floating Dashboard Mockup */}
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '900px',
        height: '450px',
        position: 'relative',
        animation: 'float 6s ease-in-out infinite',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: 0
      }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
          <div style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>office-cloud.app / dashboard</div>
        </div>
        
        <div style={{ display: 'flex', flex: 1, padding: '2rem', gap: '2rem' }}>
          {/* Mock Sidebar */}
          <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ height: '30px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}></div>
            <div style={{ height: '30px', background: 'var(--primary-color)', opacity: 0.2, borderRadius: '6px' }}></div>
            <div style={{ height: '30px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}></div>
            <div style={{ height: '30px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}></div>
          </div>
          {/* Mock Main Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}></div>
            <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
              <div style={{ flex: 2, background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}></div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

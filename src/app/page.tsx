import Link from 'next/link';
import Hero from '@/components/landing/Hero';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import Workflow from '@/components/landing/Workflow';

export default function Home() {
  return (
    <>
      <nav className="container nav" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '24px', height: '24px', background: 'var(--primary-color)', borderRadius: '6px' }}></div>
          Office Cloud
        </Link>
        <div className="nav-links">
          <Link href="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.2rem' }}>Sign In</Link>
        </div>
      </nav>

      <main className="main-content">
        <Hero />
        <FeaturesGrid />
        <Workflow />
      </main>

      <footer style={{ 
        padding: '4rem 2rem', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.5 }}>
            <div style={{ width: '20px', height: '20px', background: 'var(--text-secondary)', borderRadius: '4px' }}></div>
            <span style={{ fontWeight: 600 }}>Office Cloud</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} Office Cloud Inc. Built with Next.js, Prisma, and Supabase.
          </p>
        </div>
      </footer>
    </>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'EMAIL' | 'OTP' | 'PENDING'>('EMAIL');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Failed to send OTP');
      setLoading(false);
      return;
    }

    setStep('OTP');
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      setError(data.error || 'Invalid OTP');
      setLoading(false);
      return;
    }

    if (data.pending) {
      setStep('PENDING');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Premium Background Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: -1
      }}></div>

      <nav className="container nav" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 2rem' }}>
        <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '24px', height: '24px', background: 'var(--primary-color)', borderRadius: '6px' }}></div>
          Office Cloud
        </Link>
        <ThemeToggle />
      </nav>

      <div className="container auth-container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="auth-card glass-panel" style={{ 
          animation: 'scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
          padding: '3rem',
          maxWidth: '440px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ 
              width: '48px', height: '48px', 
              background: 'rgba(99,102,241,0.1)', 
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '12px', 
              margin: '0 auto 1.5rem auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              {step === 'EMAIL' ? '👋' : '🔐'}
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              {step === 'EMAIL' ? 'Welcome Back' : step === 'OTP' ? 'Verify Identity' : 'Awaiting Approval'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {step === 'EMAIL' 
                ? 'Sign in to access your organization workspace' 
                : step === 'OTP'
                ? `Enter the 6-digit code sent to ${email}`
                : 'Your request has been securely sent'}
            </p>
          </div>
          
          {step === 'EMAIL' ? (
            <form onSubmit={handleSendOtp} style={{ animation: 'fadeIn 0.3s ease' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 500 }}>Work Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  style={{ padding: '0.875rem 1rem', fontSize: '1rem' }}
                />
              </div>
              {error && <div className="error-msg">{error}</div>}
              <button
                type="submit"
                className="btn"
                style={{ width: '100%', marginTop: '1rem', padding: '0.875rem', fontSize: '1rem', fontWeight: 600 }}
                disabled={loading}
              >
                {loading ? 'Sending Magic Link...' : 'Continue with Email'}
              </button>
            </form>
          ) : step === 'OTP' ? (
            <form onSubmit={handleVerifyOtp} style={{ animation: 'fadeIn 0.3s ease' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 500, textAlign: 'center' }}>Secure Code</label>
                <input
                  type="text"
                  className="input-field"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  required
                  placeholder="000000"
                  maxLength={6}
                  style={{ 
                    padding: '1rem', 
                    fontSize: '2rem', 
                    letterSpacing: '0.5rem', 
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    fontWeight: 'bold'
                  }}
                />
              </div>
              {error && <div className="error-msg" style={{ textAlign: 'center' }}>{error}</div>}
              <button
                type="submit"
                className="btn"
                style={{ width: '100%', marginTop: '1.5rem', padding: '0.875rem', fontSize: '1rem', fontWeight: 600 }}
                disabled={loading || otp.length !== 6}
              >
                {loading ? 'Verifying...' : 'Authenticate'}
              </button>
              <button
                type="button"
                className="btn-outline"
                style={{ 
                  width: '100%', 
                  marginTop: '1rem', 
                  padding: '0.875rem', 
                  fontSize: '0.9rem',
                  border: 'none',
                  color: 'var(--text-secondary)'
                }}
                onClick={() => setStep('EMAIL')}
                disabled={loading}
              >
                ← Use a different email
              </button>
            </form>
          ) : step === 'PENDING' ? (
            <div style={{ animation: 'fadeIn 0.3s ease', textAlign: 'center' }}>
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Your identity has been verified, but your account is currently <strong>awaiting Manager approval</strong>. You will be able to access the workspace once approved.
                </p>
              </div>
              <button
                type="button"
                className="btn-outline"
                style={{ width: '100%', padding: '0.875rem' }}
                onClick={() => setStep('EMAIL')}
              >
                ← Return to Sign In
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

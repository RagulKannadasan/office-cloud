'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
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
    
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Invalid OTP');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <>
      <nav className="container nav">
        <Link href="/" className="nav-logo">Office Cloud</Link>
      </nav>
      <div className="container auth-container">
        <div className="auth-card glass-panel">
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            {step === 'EMAIL' ? 'Sign In to Workspace' : 'Enter verification code'}
          </h2>
          
          {step === 'EMAIL' && (
            <form onSubmit={handleSendOtp}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                />
              </div>
              {error && <div className="error-msg">{error}</div>}
              <button
                type="submit"
                className="btn"
                style={{ width: '100%', marginTop: '1rem' }}
                disabled={loading}
              >
                {loading ? 'Sending Code...' : 'Send Login Code'}
              </button>
            </form>
          )}

          {step === 'OTP' && (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label className="form-label">We sent a 6-digit code to {email}</label>
                <input
                  type="text"
                  className="input-field"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  placeholder="123456"
                  maxLength={6}
                />
              </div>
              {error && <div className="error-msg">{error}</div>}
              <button
                type="submit"
                className="btn"
                style={{ width: '100%', marginTop: '1rem' }}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                style={{ width: '100%', marginTop: '0.5rem' }}
                onClick={() => setStep('EMAIL')}
                disabled={loading}
              >
                Back to Email
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

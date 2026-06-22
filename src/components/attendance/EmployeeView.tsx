'use client';
import { useState, useEffect } from 'react';
import { clockIn, clockOut } from '@/actions/attendance.actions';

export default function EmployeeView({ userId, initialHistory, initialActiveLog }: { userId: string, initialHistory: any[], initialActiveLog: any }) {
  const [clockedIn, setClockedIn] = useState(!!initialActiveLog);
  const [activeLogId, setActiveLogId] = useState<string | null>(initialActiveLog ? initialActiveLog.id : null);
  const [time, setTime] = useState(new Date());
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleClock = async () => {
    setIsSubmitting(true);
    if (clockedIn && activeLogId) {
      await clockOut(activeLogId);
      setClockedIn(false);
      setActiveLogId(null);
    } else {
      // Because clockIn revalidates path, activeLog gets updated on next render
      // But we can eagerly update state or let server handle it. 
      // For full sync, we let the server revalidation refresh the page data
      await clockIn(userId);
      setClockedIn(true);
    }
    setShowConfirm(false);
    setIsSubmitting(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', minHeight: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 suppressHydrationWarning style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
          {time.toLocaleTimeString()}
        </h2>
        <p suppressHydrationWarning style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        
        <button 
          className="btn" 
          onClick={() => setShowConfirm(true)}
          disabled={isSubmitting}
          style={{ 
            backgroundColor: clockedIn ? '#ef4444' : 'var(--primary)',
            padding: '1rem 3rem',
            fontSize: '1.2rem',
            borderRadius: '50px',
            transition: 'all 0.2s ease',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? 'Syncing...' : (clockedIn ? 'Clock Out' : 'Clock In')}
        </button>

      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.15s ease-out forwards'
        }}>
          <div className="glass-panel" style={{
            padding: '2.5rem 3rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: '350px',
            animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Confirm Action</h3>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Are you sure you want to {clockedIn ? 'clock out' : 'clock in'}?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="btn btn-outline"
                onClick={() => setShowConfirm(false)}
                style={{ padding: '0.75rem 2rem', borderRadius: '50px', flex: 1 }}
              >
                Cancel
              </button>
              <button 
                className="btn"
                onClick={handleToggleClock}
                style={{ 
                  backgroundColor: clockedIn ? '#ef4444' : 'var(--primary)',
                  padding: '0.75rem 2rem', 
                  borderRadius: '50px',
                  flex: 1
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-panel">
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Date</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Time In</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Time Out</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {initialHistory.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{new Date(log.checkIn).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>{new Date(log.checkIn).toLocaleTimeString()}</td>
                <td style={{ padding: '1rem' }}>{log.checkOut ? new Date(log.checkOut).toLocaleTimeString() : '---'}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px', 
                    fontSize: '0.875rem',
                    backgroundColor: log.status === 'Active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.1)',
                    color: log.status === 'Active' ? '#4ade80' : 'inherit'
                  }}>
                    {log.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{log.hours ? `${log.hours}h` : '---'}</td>
              </tr>
            ))}
            {initialHistory.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No attendance logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

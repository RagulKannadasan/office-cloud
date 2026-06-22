'use client';

import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import ConfirmModal from '@/components/ui/ConfirmModal';

interface Props {
  email: string;
  signOutAction: () => Promise<void>;
}

export default function TopHeader({ email, signOutAction }: Props) {
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = () => {
    setShowSignOutModal(true);
  };

  const confirmSignOut = async () => {
    setShowSignOutModal(false);
    await signOutAction();
  };
  return (
    <header className="dashboard-top-header">
      <div>
        {/* Mobile menu toggle could go here */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <ThemeToggle />
        <span style={{ color: 'var(--text-secondary)' }}>{email}</span>
        <button onClick={handleSignOut} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          Sign Out
        </button>
      </div>

      <ConfirmModal 
        isOpen={showSignOutModal}
        title="Sign Out"
        message="Are you sure you want to log out of your session?"
        confirmText="Sign Out"
        cancelText="Cancel"
        onConfirm={confirmSignOut}
        onCancel={() => setShowSignOutModal(false)}
      />
    </header>
  );
}

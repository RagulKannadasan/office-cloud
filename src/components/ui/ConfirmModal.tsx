'use client';

export default function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  isDanger = false 
}: { 
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 9999, animation: 'fadeIn 0.15s ease-out forwards'
    }}>
      <div className="glass-panel" style={{ minWidth: '400px', maxWidth: '90vw', animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
        <h3 style={{ marginBottom: '1rem', color: isDanger ? '#ef4444' : 'inherit' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{message}</p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onCancel}>
            {cancelText}
          </button>
          <button 
            type="button" 
            className="btn" 
            style={{ flex: 1, backgroundColor: isDanger ? '#ef4444' : 'var(--primary-color)', borderColor: isDanger ? '#ef4444' : 'var(--primary-color)' }} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

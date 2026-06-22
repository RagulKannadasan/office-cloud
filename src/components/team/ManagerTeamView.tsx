import { useState } from 'react';
import { createTeamMember, removeTeamMember, approveUser } from '@/actions/user.actions';
import ConfirmModal from '@/components/ui/ConfirmModal';

export default function ManagerTeamView({ initialMembers, pendingUsers = [] }: { initialMembers: any[], pendingUsers?: any[] }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, userId: string | null, type: 'remove' | 'reject' | null}>({
    isOpen: false, userId: null, type: null
  });
  const [newMember, setNewMember] = useState({ email: '', name: '', role: 'employee', department: 'Engineering', tlId: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tls = initialMembers.filter(m => m.role === 'tl');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createTeamMember({
      email: newMember.email,
      name: newMember.name,
      role: newMember.role,
      department: newMember.department,
      teamLeaderId: newMember.role === 'employee' && newMember.tlId ? newMember.tlId : null,
      status: 'Active'
    });
    setShowAddModal(false);
    setNewMember({ email: '', name: '', role: 'employee', department: 'Engineering', tlId: '' });
    setIsSubmitting(false);
  };

  const handleRemoveClick = (id: string, type: 'remove' | 'reject') => {
    setConfirmModal({ isOpen: true, userId: id, type });
  };

  const executeRemoveOrReject = async () => {
    if (confirmModal.userId) {
      // In this case, both remove and reject use the removeTeamMember action 
      // (which deletes the user record from the database)
      await removeTeamMember(confirmModal.userId);
    }
    setConfirmModal({ isOpen: false, userId: null, type: null });
  };

  const handleApprove = async (id: string) => {
    await approveUser(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {pendingUsers.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-color)' }}></span>
            Pending Approvals ({pendingUsers.length})
          </h3>
          <div className="glass-panel" style={{ border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Email / Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Requested On</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>{user.email}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {user.employeeId && <span style={{ marginRight: '8px', color: 'var(--primary-color)' }}>{user.employeeId}</span>}
                        {user.name}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn" 
                        style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                        onClick={() => handleApprove(user.id)}
                      >
                        Approve Access
                      </button>
                      <button 
                        className="btn-outline" 
                        style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }}
                        onClick={() => handleRemoveClick(user.id, 'reject')}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: pendingUsers.length > 0 ? '2rem' : '0' }}>
        <h2>Company Directory</h2>
        <button className="btn" onClick={() => setShowAddModal(true)}>+ Add Member</button>
      </div>

      <div className="glass-panel">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Name / Email</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Role</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Department</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Assigned TL</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialMembers.map(member => (
              <tr key={member.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>
                  <div>{member.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {member.employeeId && <span style={{ marginRight: '8px', color: 'var(--primary-color)' }}>{member.employeeId}</span>}
                    {member.email}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px', 
                    fontSize: '0.875rem',
                    textTransform: 'capitalize',
                    backgroundColor: member.role === 'tl' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.1)',
                    color: member.role === 'tl' ? '#a5b4fc' : 'inherit'
                  }}>
                    {member.role === 'tl' ? 'Team Leader' : member.role}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{member.department || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>
                  {member.teamLeader ? member.teamLeader.name : 'N/A'}
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-outline" 
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderColor: '#ef4444', color: '#ef4444' }}
                    onClick={() => handleRemoveClick(member.id, 'remove')}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {initialMembers.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No members found. Add someone to the directory!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000, animation: 'fadeIn 0.15s ease-out forwards'
        }}>
          <div className="glass-panel" style={{ minWidth: '400px', animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Add New Member</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input required type="email" className="input-field" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input required className="input-field" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select className="input-field" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})}>
                  <option value="employee">Employee</option>
                  <option value="tl">Team Leader</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              {newMember.role === 'employee' && (
                <div className="form-group">
                  <label className="form-label">Assign to TL</label>
                  <select required className="input-field" value={newMember.tlId} onChange={e => setNewMember({...newMember, tlId: e.target.value})}>
                    <option value="">Select a TL</option>
                    {tls.map(tl => <option key={tl.id} value={tl.id}>{tl.name}</option>)}
                  </select>
                </div>
              )}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddModal(false)} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="btn" style={{ flex: 1 }} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title={confirmModal.type === 'reject' ? "Reject Application" : "Remove Member"}
        message={confirmModal.type === 'reject' ? "Are you sure you want to reject this access request? This cannot be undone." : "Are you sure you want to remove this member from the directory? This will permanently delete their account and associated records."}
        confirmText={confirmModal.type === 'reject' ? "Yes, Reject" : "Yes, Remove"}
        cancelText="Cancel"
        isDanger={true}
        onConfirm={executeRemoveOrReject}
        onCancel={() => setConfirmModal({ isOpen: false, userId: null, type: null })}
      />
    </div>
  );
}

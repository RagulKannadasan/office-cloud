import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import { getMyLeaveRequests, getTeamLeaveRequests, submitLeaveRequest, updateLeaveStatus } from '@/actions/leave.actions';
import { revalidatePath } from 'next/cache';

export default async function LeaveManagementPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  if (!token) redirect('/login');
  const user: any = await verifyToken(token);
  if (!user) redirect('/login');

  const role = user.role || 'employee';

  // Fetch data
  const myLeavesRes = await getMyLeaveRequests();
  const teamLeavesRes = (role !== 'employee') ? await getTeamLeaveRequests() : { success: true, data: [] };

  const myLeaves = (myLeavesRes.success && myLeavesRes.data) ? myLeavesRes.data : [];
  const teamLeaves = (teamLeavesRes.success && teamLeavesRes.data) ? teamLeavesRes.data : [];

  // Actions
  async function submitForm(formData: FormData) {
    'use server';
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);
    const reason = formData.get('reason') as string;
    await submitLeaveRequest(startDate, endDate, reason);
    revalidatePath('/dashboard/leave');
  }

  async function approveLeave(formData: FormData) {
    'use server';
    await updateLeaveStatus(formData.get('id') as string, 'Approved');
    revalidatePath('/dashboard/leave');
  }

  async function denyLeave(formData: FormData) {
    'use server';
    await updateLeaveStatus(formData.get('id') as string, 'Denied');
    revalidatePath('/dashboard/leave');
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Leave Management</h1>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Left Column: Submit Request (Employees & TLs) */}
        <div style={{ flex: '1 1 300px' }}>
          <div className="glass-panel" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Request Time Off</h3>
            <form action={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Start Date</label>
                <input type="date" name="startDate" required className="input-field" style={{ marginBottom: 0 }} />
              </div>
              <div>
                <label className="form-label">End Date</label>
                <input type="date" name="endDate" required className="input-field" style={{ marginBottom: 0 }} />
              </div>
              <div>
                <label className="form-label">Reason</label>
                <textarea name="reason" required className="input-field" style={{ marginBottom: 0, minHeight: '80px', resize: 'vertical' }} placeholder="Sick leave, vacation, etc." />
              </div>
              <button type="submit" className="btn">Submit Request</button>
            </form>
          </div>

          <div className="glass-panel">
            <h3 style={{ marginBottom: '1rem' }}>My Requests</h3>
            {myLeaves.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No leave requests found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {myLeaves.map((leave: any) => (
                  <div key={leave.id} style={{ 
                    padding: '1rem', 
                    background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '8px' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.9rem' }}>{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</strong>
                      <span style={{ 
                        fontSize: '0.8rem', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '4px',
                        background: leave.status === 'Approved' ? 'rgba(16,185,129,0.2)' : leave.status === 'Denied' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                        color: leave.status === 'Approved' ? '#10b981' : leave.status === 'Denied' ? '#ef4444' : '#f59e0b'
                      }}>
                        {leave.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{leave.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Team Requests (Managers, TLs, CEO) */}
        {role !== 'employee' && (
          <div style={{ flex: '2 1 500px' }}>
            <div className="glass-panel">
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Team Leave Requests</h3>
              {teamLeaves.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No pending requests from your squad.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {teamLeaves.map((leave: any) => (
                    <div key={leave.id} style={{ 
                      padding: '1rem', 
                      background: 'rgba(255,255,255,0.02)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontWeight: 600 }}>{leave.user.email}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                          </div>
                        </div>
                        <span style={{ 
                          fontSize: '0.8rem', 
                          padding: '0.2rem 0.5rem', 
                          borderRadius: '4px',
                          background: leave.status === 'Approved' ? 'rgba(16,185,129,0.2)' : leave.status === 'Denied' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                          color: leave.status === 'Approved' ? '#10b981' : leave.status === 'Denied' ? '#ef4444' : '#f59e0b'
                        }}>
                          {leave.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.9rem', margin: 0, padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                        {leave.reason}
                      </p>
                      
                      {leave.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <form action={approveLeave}>
                            <input type="hidden" name="id" value={leave.id} />
                            <button type="submit" className="btn" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', background: 'var(--success-color)' }}>Approve</button>
                          </form>
                          <form action={denyLeave}>
                            <input type="hidden" name="id" value={leave.id} />
                            <button type="submit" className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }}>Deny</button>
                          </form>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

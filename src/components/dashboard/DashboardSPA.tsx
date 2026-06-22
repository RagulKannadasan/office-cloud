'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/dashboard/Sidebar';
import TopHeader from '@/components/dashboard/TopHeader';
import { fetchOverviewData, fetchBackgroundData } from '@/actions/dashboard.actions';

// Dynamically import heavy tabs so they aren't included in the initial bundle
const OverviewTab = dynamic(() => import('./tabs/OverviewTab'), { ssr: false });
const DirectoryTab = dynamic(() => import('./tabs/DirectoryTab'), { ssr: false });
const AttendanceTab = dynamic(() => import('./tabs/AttendanceTab'), { ssr: false });
const LeaveTab = dynamic(() => import('./tabs/LeaveTab'), { ssr: false });
const TeamTab = dynamic(() => import('./tabs/TeamTab'), { ssr: false });
const AdminTab = dynamic(() => import('./tabs/AdminTab'), { ssr: false });
const ReportsTab = dynamic(() => import('./tabs/ReportsTab'), { ssr: false });

export default function DashboardSPA({ user, signOutAction }: { user: any, signOutAction: any }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    
    async function loadData() {
      // Stage 1: Load critical overview data instantly
      const overviewData = await fetchOverviewData(user.role, user.id);
      
      if (mounted) {
        setData({
          user,
          role: user.role,
          ...overviewData
        });
        
        // Stage 2: Background pre-fetch the rest of the tabs
        const bgData = await fetchBackgroundData(user.role, user.id);
        if (mounted) {
          setData((prev: any) => ({
            ...prev,
            ...bgData
          }));
        }
      }
    }
    
    loadData();
    return () => { mounted = false; };
  }, [user]);

  return (
    <div className="dashboard-layout">
      <Sidebar role={user.role} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-main-area">
        <TopHeader email={user.email} signOutAction={signOutAction} />
        <main className="dashboard-content-area">
          {!data ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
              <div style={{ height: '100px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ height: '120px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }} />
                <div style={{ height: '120px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }} />
                <div style={{ height: '120px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }} />
              </div>
              <div style={{ height: '400px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }} />
            </div>
          ) : (
            <>
              {activeTab === 'overview' && <OverviewTab data={data} setActiveTab={setActiveTab} />}
              {activeTab === 'directory' && <DirectoryTab data={data} />}
              {activeTab === 'attendance' && <AttendanceTab data={data} />}
              {activeTab === 'leave' && <LeaveTab data={data} />}
              {activeTab === 'team' && <TeamTab data={data} />}
              {activeTab === 'admin' && <AdminTab data={data} />}
              {activeTab === 'reports' && <ReportsTab data={data} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

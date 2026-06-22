import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import TopHeader from '@/components/dashboard/TopHeader';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

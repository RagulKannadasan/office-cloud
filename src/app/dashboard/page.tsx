import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import DashboardSPA from '@/components/dashboard/DashboardSPA';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  if (!token) redirect('/login');
  
  const user: any = await verifyToken(token);
  if (!user) redirect('/login');

  async function signOut() {
    'use server'
    const cookieStore = await cookies();
    cookieStore.delete('session_token');
    redirect('/login');
  }

  // Instantly return the shell without blocking for data fetching
  return <DashboardSPA user={user} signOutAction={signOut} />;
}

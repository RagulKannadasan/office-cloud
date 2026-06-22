'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/auth';

export async function getAttendanceReport() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  if (!token) throw new Error('Not authenticated');
  const user = await verifyToken(token);
  if (!user || (user.role === 'employee')) throw new Error('Unauthorized');

  // Fetch all attendance logs completed in the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  let whereClause: any = {
    checkIn: { gte: thirtyDaysAgo },
    status: 'Completed'
  };

  // If Manager or TL, only fetch for their squad
  if (user.role === 'manager' || user.role === 'tl') {
    const squad = await prisma.user.findMany({
      where: { teamLeaderId: user.id as string },
      select: { id: true }
    });
    whereClause.userId = { in: squad.map(s => s.id) };
  }

  const logs = await prisma.attendanceLog.findMany({
    where: whereClause,
    select: { checkIn: true, hours: true }
  });

  // Aggregate hours by date
  const aggregated: Record<string, number> = {};
  logs.forEach(log => {
    const dateStr = new Date(log.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    aggregated[dateStr] = (aggregated[dateStr] || 0) + (log.hours || 0);
  });

  // Convert to array for Recharts
  const chartData = Object.keys(aggregated).map(date => ({
    date,
    hours: Math.round(aggregated[date] * 10) / 10 // Round to 1 decimal
  }));

  // Sort by date chronologically
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return chartData;
}

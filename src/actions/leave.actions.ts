'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/auth';

/** Utility to authenticate current user */
async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  if (!token) throw new Error('Not authenticated');
  const user = await verifyToken(token);
  if (!user) throw new Error('Invalid token');
  return user;
}

export async function submitLeaveRequest(startDate: Date, endDate: Date, reason: string) {
  try {
    const user = await getCurrentUser();
    
    await prisma.leaveRequest.create({
      data: {
        userId: user.id as string,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason
      }
    });
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getMyLeaveRequests() {
  try {
    const user = await getCurrentUser();
    const requests = await prisma.leaveRequest.findMany({
      where: { userId: user.id as string },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: requests };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getTeamLeaveRequests() {
  try {
    const user = await getCurrentUser();
    
    // CEO can see everything, Manager/TL see their squad
    let queryArgs: any = {
      include: { user: { select: { email: true, name: true, role: true } } },
      orderBy: { createdAt: 'desc' as const }
    };

    if (user.role === 'manager' || user.role === 'tl') {
      // Find all employees where teamLeaderId is this user
      const squad = await prisma.user.findMany({
        where: { teamLeaderId: user.id as string },
        select: { id: true }
      });
      const squadIds = squad.map(s => s.id);
      queryArgs.where = { userId: { in: squadIds } };
    } else if (user.role !== 'ceo') {
      throw new Error('Unauthorized');
    }

    const requests = await prisma.leaveRequest.findMany(queryArgs);
    return { success: true, data: requests };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateLeaveStatus(leaveId: string, status: 'Approved' | 'Denied') {
  try {
    const user = await getCurrentUser();
    if (user.role === 'employee') throw new Error('Unauthorized');

    await prisma.leaveRequest.update({
      where: { id: leaveId },
      data: { status }
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

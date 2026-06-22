'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getMyHistory(userId: string) {
  return await prisma.attendanceLog.findMany({
    where: { userId },
    orderBy: { checkIn: 'desc' },
    take: 10
  })
}

export async function getActiveLog(userId: string) {
  return await prisma.attendanceLog.findFirst({
    where: { userId, status: 'Active' }
  })
}

export async function clockIn(userId: string) {
  await prisma.attendanceLog.create({
    data: {
      userId,
      status: 'Active'
    }
  })
  revalidatePath('/dashboard/attendance')
}

export async function clockOut(logId: string) {
  const log = await prisma.attendanceLog.findUnique({ where: { id: logId } })
  if (!log) return;
  
  const checkOut = new Date()
  const hours = (checkOut.getTime() - log.checkIn.getTime()) / (1000 * 60 * 60)
  
  await prisma.attendanceLog.update({
    where: { id: logId },
    data: {
      checkOut,
      status: 'Completed',
      hours: parseFloat(hours.toFixed(2))
    }
  })
  revalidatePath('/dashboard/attendance')
}

'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function generateEmployeeId() {
  const lastUser = await prisma.user.findFirst({
    where: { employeeId: { not: null } },
    orderBy: { employeeId: 'desc' }
  });
  let nextNum = 1;
  if (lastUser && lastUser.employeeId) {
    const numPart = lastUser.employeeId.replace('EM', '');
    const num = parseInt(numPart);
    if (!isNaN(num)) nextNum = num + 1;
  }
  return `EM${String(nextNum).padStart(3, '0')}`;
}

export async function getCompanyDirectory() {
  return await prisma.user.findMany({
    where: { status: 'Active' },
    orderBy: { createdAt: 'desc' },
    include: { teamLeader: true }
  })
}

export async function getSquad(tlId: string) {
  return await prisma.user.findMany({
    where: { teamLeaderId: tlId }
  })
}

export async function createTeamMember(data: any) {
  const employeeId = await generateEmployeeId();
  await prisma.user.create({ 
    data: { ...data, employeeId } 
  });
  revalidatePath('/dashboard/team')
}

export async function removeTeamMember(id: string) {
  await prisma.user.delete({ where: { id } })
  revalidatePath('/dashboard/team')
}

export async function getPendingUsers() {
  return await prisma.user.findMany({
    where: { status: 'Pending' },
    orderBy: { createdAt: 'desc' }
  })
}

export async function approveUser(id: string) {
  await prisma.user.update({
    where: { id },
    data: { status: 'Active' }
  })
  revalidatePath('/dashboard/team')
}

'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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
  await prisma.user.create({ data })
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

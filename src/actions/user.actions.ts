'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCompanyDirectory() {
  return await prisma.user.findMany({
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

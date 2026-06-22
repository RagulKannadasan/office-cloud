import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany({
    where: { employeeId: null },
    orderBy: { createdAt: 'asc' }
  });
  
  let nextNum = 1;
  const lastUser = await prisma.user.findFirst({
    where: { employeeId: { not: null } },
    orderBy: { employeeId: 'desc' }
  });
  if (lastUser && lastUser.employeeId) {
    const numPart = lastUser.employeeId.replace('EM', '');
    const num = parseInt(numPart);
    if (!isNaN(num)) nextNum = num + 1;
  }

  for (const user of users) {
    const empId = `EM${String(nextNum).padStart(3, '0')}`;
    await prisma.user.update({
      where: { id: user.id },
      data: { employeeId: empId }
    });
    nextNum++;
  }
  return NextResponse.json({ success: true, count: users.length });
}

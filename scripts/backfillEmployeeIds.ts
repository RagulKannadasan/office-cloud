import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { employeeId: null },
    orderBy: { createdAt: 'asc' }
  });
  
  let nextNum = 1;
  
  // Find highest existing
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
    console.log(`Assigned ${empId} to ${user.email}`);
    nextNum++;
  }
  console.log('Backfill complete!');
}

main().catch(e => console.error("ERROR MESSAGE:", e.message)).finally(() => prisma.$disconnect());

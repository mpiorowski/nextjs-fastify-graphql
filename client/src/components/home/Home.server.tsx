import { PrismaClient } from '@prisma/client';

export async function getAllUsers() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return users;
}

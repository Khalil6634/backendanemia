import { PrismaClient } from '@prisma/client';

// Mendeklarasikan tipe global untuk mencegah multiple instance saat development (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'], // Opsional: Untuk melihat log query di terminal
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
// Import the PrismaClient class from the @prisma/client package.
import { PrismaClient } from '@prisma/client'

// Use a global variable to store the PrismaClient instance.
// This prevents creating multiple instances of PrismaClient during development, which can lead to database connection issues.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Export a singleton PrismaClient instance.
// If there's already a PrismaClient instance in the global variable, use it; otherwise, create a new instance.
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// In development mode, store the PrismaClient instance globally.
// This ensures that the same instance is reused during hot module replacement (HMR).
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __relicRushPrisma__: PrismaClient | undefined;
}

export function getPrismaClient(): PrismaClient {
  if (!global.__relicRushPrisma__) {
    global.__relicRushPrisma__ = new PrismaClient();
  }

  return global.__relicRushPrisma__;
}

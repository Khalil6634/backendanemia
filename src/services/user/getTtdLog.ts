import { PrismaClient, TtdStatus } from "@prisma/client";
import prisma from "../../config/prisma.js";

export async function getTtdLogsByUserId(
  userId: string,
  Month:string,
  Index: string,
  Limit: string,
) {
  const limit = Number(Limit);
  const index = Number(Index);

  try {
    const [logs, jumlah] = await Promise.all([
      prisma.ttdRecord.findMany({
        where: {
          userId,
        },
      }),
      prisma.ttdRecord.count({
        where : {
            userId
        }
      })
    ]);

    return {
      success: true,
      message: "Berhasil mengambil data log TTD",
      data: logs,
      jumlah
    };
  } catch (error) {
    console.error("Error fetching TTD logs:", error);
    throw new Error("Gagal mengambil riwayat log TTD dari database.");
  }
}

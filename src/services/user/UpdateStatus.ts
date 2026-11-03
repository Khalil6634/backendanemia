import type { TtdRecord } from "../../models/user/TTDCalendar.js";
import prisma from "../../config/prisma.js";

export async function upsertTtdRecord(data: TtdRecord) {
  const { userId, date, status, label, desc } = data;
  console.log({ userId, date, status, label, desc })

  const targetDate = new Date(date);

  try {
    const record = await prisma.ttdRecord.upsert({
      where: {
        userId_date: {
          userId,
          date: targetDate,
        },
      },
      update: {
        status,
        label,
        desc,
      },
      create: {
        userId,
        date: targetDate,
        status,
        label,
        desc,
      },
    });

    return {
      success: true,
      message: "Status TTD berhasil diperbarui",
      data: record,
    };
  } catch (error) {
    console.error("Error updating TTD record:", error);
    throw new Error("Gagal memperbarui status TTD di database.");
  }
}
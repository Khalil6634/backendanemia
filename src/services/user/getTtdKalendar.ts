import prisma from "../../config/prisma.js";
/**
 * Service untuk mengambil data kalender TTD dan menghitung ringkasan bulan ini
 */
export async function getCalendarViewData(userId: string, year: number, month: number) {
  try {
    // Tentukan tanggal awal dan akhir bulan (00:00:00 sampai 23:59:59)
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59);

    // Ambil seluruh record TTD milik user pada rentang bulan tersebut
    const records = await prisma.ttdRecord.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Hitung ringkasan statistik sesuai tampilan UI
    const jadwalTtd = records.length;
    const sudahDicatat = records.filter(r => r.status === 'SUDAH').length;
    // Menggabungkan status 'pending' atau 'terlewat' sebagai belum dicatat
    const belumDicatat = records.filter(r => r.status === 'BELUM_DICATAT' || r.status === 'TERLEWAT').length;

    return {
      success: true,
      message: "Berhasil mengambil data kalender dan ringkasan TTD",
      data: {
        summary: {
          jadwalTtd,
          sudahDicatat,
          belumDicatat,
        },
        records: records, // Digunakan untuk menandai warna tanggal di komponen kalender
      },
    };
  } catch (error) {
    console.error("Error fetching calendar view data:", error);
    throw new Error("Gagal mengambil data kalender dari database.");
  }
}
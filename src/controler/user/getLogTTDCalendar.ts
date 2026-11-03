import type { Response } from 'express';
import type { AuthRequest } from '../../models/user/userModels.js'; // Sesuaikan path import AuthRequest Anda
import { getCalendarViewData } from '../../services/user/getTtdKalendar.js';

/**
 * Controller untuk merespon data kalender dan ringkasan bulan ini
 */
export async function handleGetCalendarView(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized: Sesi tidak valid" 
      });
    }

    // Ambil query parameter year & month, jika tidak ada gunakan bulan/tahun saat ini
    const { year, month } = req.query;
    
    const targetYear = year ? parseInt(year as string, 10) : new Date().getFullYear();
    const targetMonth = month ? parseInt(month as string, 10) : new Date().getMonth(); // 0 = Januari, 10 = November

    // Panggil service
    const result = await getCalendarViewData(userId, targetYear, targetMonth);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Terjadi kesalahan pada server" 
    });
  }
}
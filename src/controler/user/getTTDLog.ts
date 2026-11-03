import type { Response } from "express";
import type { AuthRequest } from "../../models/user/userModels.js"; // Sesuaikan path import AuthRequest Anda
import { getTtdLogsByUserId } from "../../services/user/getTtdLog.js";

export async function handleGetTtdLogs(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    const limit = req.query.limit;
    const index = req.query.index;
    let month = req.query.month;

    const monthStr =
      typeof month === "string" ? month : new Date().getMonth().toString();
    const indexStr = typeof index === "string" ? index : "0"; // Sesuaikan nilai default index Anda
    const limitStr = typeof limit === "string" ? limit : "10";

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Sesi tidak valid atau token tidak ditemukan",
      });
    }

    // Panggil service
    const result = await getTtdLogsByUserId(
      userId,
      monthStr,
      indexStr,
      limitStr
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
}

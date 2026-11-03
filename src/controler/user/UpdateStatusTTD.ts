import type { Response } from "express";
import { upsertTtdRecord } from "../../services/user/UpdateStatus.js";
import type { AuthRequest } from "../../models/user/userModels.js";

export async function handleUpdateTtd(req: AuthRequest, res: Response) {
  try {  
    const userId = req.user?.id;
    const { date, status, label, desc } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Sesi tidak valid" });
    }

    if (!date || !status || !label) {
      return res.status(400).json({
        success: false,
        message: "Field date, status, dan label wajib diisi!",
      });
    }

    const result = await upsertTtdRecord({
      userId: userId,
      date: date,
      status: status,
      label: label,
      desc: desc,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
}

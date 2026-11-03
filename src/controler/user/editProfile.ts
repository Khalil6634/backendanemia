import type { Response } from 'express';
import type { AuthRequest } from '../../models/user/userModels.js'; // Sesuaikan path import AuthRequest Anda
import { updateUserData } from '../../services/user/EditProfile.js';

/**
 * Controller untuk menangani endpoint edit profile
 */
export async function handleUpdateProfile(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized: Sesi tidak valid" 
      });
    }

    const { name, school, class: studentClass, phone, dob } = req.body;

    // Panggil service
    const result = await updateUserData(userId, {
      name,
      school,
      class: studentClass,
      phone,
      dob,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Terjadi kesalahan pada server" 
    });
  }
}
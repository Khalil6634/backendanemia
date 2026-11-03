import type { Request, Response } from 'express';
import { registerUser } from '../../services/user/Signup.js';

/**
 * Controller untuk menangani endpoint POST /api/auth/signup
 */
export async function handleSignup(req: Request, res: Response) {
  try {
    const { name, nis, school, class: studentClass, dob, phone, password } = req.body;

    // Validasi field wajib
    if (!name || !nis || !school || !studentClass || !dob || !password) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi kecuali nomor telepon!",
      });
    }

    // Panggil service register
    const result = await registerUser({
      name,
      nis,
      school,
      class: studentClass,
      dob,
      phone,
      password,
    });

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
}
import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest, User } from '../models/user/userModels.js';

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  // 1. Ambil header Authorization
  const authHeader = req.headers['authorization'];
  
  // Format token dari frontend biasanya: "Bearer eyJhbGciOiJIUzI1..."
  const token = authHeader && authHeader.split(' ')[1];

  // 2. Jika token tidak ada, tolak akses (401 Unauthorized)
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Akses ditolak: Token tidak ditemukan. Silakan login kembali." 
    });
  }

  try {
    // 3. Verifikasi dan decode token menggunakan JWT_SECRET
    const secretKey = process.env.JWT_SECRET || "ANEMIA_123";
    const decoded = jwt.verify(token, secretKey as string) as User;


    // 4. Simpan data hasil decode ke dalam req.user
    // Sekarang req.user berisi { id, nis, school, class }
    req.user = decoded;

    // 5. Lanjut ke proses controller berikutnya
    next();
  } catch (error:any) {
    console.log(error.message)
    // Jika token salah, diubah, atau kedaluwarsa (403 Forbidden)
    return res.status(403).json({ 
      success: false, 
      message: "Sesi tidak valid atau telah berakhir. Silakan login ulang." 
    });
  }
}
//ini buat model data user
import type { Request } from 'express';
import type { TtdRecord } from "./TTDCalendar.js";

export interface User {
  id: string;
  name: string;
  nis: string;
  school: string;
  class: string;
  dob: Date | string; // Bisa berupa objek Date atau string ISO dari database/API
  phone?: string | null;
  password?: string;  // Opsional, biasanya disembunyikan saat dikirim ke frontend
  createdAt: Date | string;
  updatedAt: Date | string;
  records?: TtdRecord[]; // Relasi opsional jika di-include
}




// Perluas tipe Request bawaan Express
export interface AuthRequest extends Request {
  user?: User;
}
//ini buat model data-data user
// 1. Enum Status Kepatuhan TTD (Menyesuaikan dengan Enum di Prisma)
export type TtdStatus = 'SUDAH' | 'JADWAL' | 'TERLEWAT' | 'BELUM_DICATAT';
import type { TtdRecord } from "@prisma/client";

// 2. Tipe Data Model User (Siswa)
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

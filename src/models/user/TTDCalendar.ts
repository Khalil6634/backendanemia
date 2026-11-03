//ini buat model data calendar user
// 1. Enum Status Kepatuhan TTD (Menyesuaikan dengan Enum di Prisma)
export type TtdStatus = 'SUDAH' | 'JADWAL' | 'TERLEWAT' | 'BELUM_DICATAT';
import type { User } from "./userModels.js";


// 3. Tipe Data Model TtdRecord (Untuk Shadcn Calendar & ScrollArea Log)
export interface TtdRecord {
  id?: string;
  userId: string;
  user?: User;       // Relasi opsional
  date: Date | string;
  status: TtdStatus;
  label: string;     // Contoh: "Sudah Diminum", "Jadwal Hari Ini", "Terlewat"
  desc: string | null; // Keterangan detail / jam pencatatan
  createdAt?: Date | string;
  updatedAt?: Date | string;
}


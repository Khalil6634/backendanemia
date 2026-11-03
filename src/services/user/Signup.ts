import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface SignupData {
  name: string;
  nis: string;
  school: string;
  class: string;
  dob: string | Date;
  phone: string | null;
  password: string;
}

/**
 * Service untuk mendaftarkan user baru ke database
 */
export async function registerUser(data: SignupData) {
  const { name, nis, school, class: studentClass, dob, phone, password } = data;

  // 1. Cek apakah NIS sudah terdaftar sebelumnya
  const existingUser = await prisma.user.findUnique({
    where: { nis },
  });

  if (existingUser) {
    throw new Error("NIS sudah terdaftar. Silakan gunakan NIS lain atau masuk ke akun Anda.");
  }

  // 2. Hash password menggunakan bcrypt dengan salt rounds 10
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Simpan data user ke database
  const newUser = await prisma.user.create({
    data: {
      name,
      nis,
      school,
      class: studentClass,
      dob: new Date(dob),
      phone,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      nis: true,
      school: true,
      class: true,
      createdAt: true,
    },
  });

  return {
    success: true,
    message: "Registrasi akun berhasil!",
    data: newUser,
  };
}
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UpdateProfileData {
  name?: string;
  school?: string;
  class?: string;
  phone?: string | null;
  dob?: Date | string;
}

/**
 * Service untuk memperbarui data profil siswa
 */
export async function updateUserData(userId: string, data: UpdateProfileData) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.school && { school: data.school }),
        ...(data.class && { class: data.class }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.dob && { dob: new Date(data.dob) }),
      },
      select: {
        id: true,
        name: true,
        nis: true,
        school: true,
        class: true,
        dob: true,
        phone: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      message: "Profil berhasil diperbarui",
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Gagal memperbarui profil di database.");
  }
}
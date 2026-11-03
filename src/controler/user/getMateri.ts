import type { Article } from "@prisma/client";
import type { Request, Response } from "express";
import prisma from "../../config/prisma.js";

/**
 * Service untuk mengambil semua daftar materi edukasi
 */
export async function getAllMateri() {
  try {
    const materiList = await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc', // Urutkan dari materi terbaru
      },
    });

    return {
      success: true,
      message: "Berhasil mengambil daftar materi edukasi",
      data: materiList,
    };
  } catch (error) {
    console.error("Error fetching all materi:", error);
    throw new Error("Gagal mengambil daftar materi dari database.");
  }
}

/**
 * Service untuk mengambil detail satu materi berdasarkan slug
 */
export async function getMateriBySlug(slug: string) {
  try {
    const materi = await prisma.article.findUnique({
      where: { slug },
    });

    if (!materi) {
      return {
        success: false,
        message: "Materi edukasi tidak ditemukan",
        data: null,
      };
    }

    return {
      success: true,
      message: "Berhasil mengambil detail materi",
      data: materi,
    };
  } catch (error) {
    console.error("Error fetching materi by slug:", error);
    throw new Error("Gagal mengambil detail materi.");
  }
}
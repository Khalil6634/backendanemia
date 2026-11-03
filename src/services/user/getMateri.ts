import type { Request, Response } from 'express';
import { getAllMateri, getMateriBySlug } from '../../controler/user/getMateri.js';

/**
 * Controller untuk mendapatkan data materi (List atau Detail berdasarkan slug)
 */
export async function handleGetMateri(req: Request, res: Response) {
  try {
    const { slug } = req.query;

    // Jika ada parameter slug, ambil detail artikel/materi tertentu
    if (slug && typeof slug === 'string') {
      const result = await getMateriBySlug(slug);
      return res.status(result.success ? 200 : 404).json(result);
    }

    // Jika tidak ada slug, kembalikan seluruh daftar materi
    const result = await getAllMateri();
    return res.status(200).json(result);
    
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
}
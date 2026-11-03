// Contoh singkat di backend Controller Express
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

export async function handleLogin(req: Request, res: Response) {
  const { nis, password } = req.body;

  const user = await prisma.user.findUnique({ where: { nis } });
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "NIS tidak ditemukan" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ success: false, message: "Password salah" });

  const token = jwt.sign(
    { id: user.id, nis: user.nis, username: user.name },
    process.env.JWT_SECRET ||"ANEMIA_123",
    { expiresIn: "1d" },
  );

  return res.status(200).json({
    success: true,
    message: "Login berhasil",
    token,
    data: { id: user.id, name: user.name, nis: user.nis },
  });
}

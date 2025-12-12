import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";

// Lấy thông tin user
export const getProfile = async (req: Request, res: Response) => {
  const userId = req.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true }
  });

  return res.json(user);
};

// Cập nhật profile
export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { name, email } = req.body;

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { name, email }
  });

  return res.json({ message: "Profile updated", user: updated });
};

// Đổi mật khẩu
export const changePassword = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) return res.status(400).json({ message: "Invalid current password" });

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed }
  });

  return res.json({ message: "Password changed successfully" });
};

// Xóa tài khoản
export const deleteProfile = async (req: Request, res: Response) => {
  const userId = req.userId;

  await prisma.user.delete({ where: { id: userId } });

  return res.json({ message: "Account deleted" });
};

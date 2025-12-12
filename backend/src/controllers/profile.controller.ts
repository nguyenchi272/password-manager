import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma.js";

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true }
  });

  res.json(user);
};


export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { name } = req.body;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { name },
    select: { id: true, email: true, name: true }
  });

  res.json(updated);
};


export const updateEmail = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { email } = req.body;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { email },
    select: { id: true, email: true, name: true }
  });

  res.json(updated);
};

export const updatePassword = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid current password" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed }
  });

  res.json({ message: "Password updated" });
};


export const deleteAccount = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  await prisma.user.delete({ where: { id: userId } });

  res.json({ message: "Account deleted" });
};


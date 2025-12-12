import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prisma from "../utils/prisma.js";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: "Email already used" });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hash }
  });

  const secret = process.env.JWT_SECRET || "secret";
  const token = jwt.sign({ id: user.id }, secret);

  res.json({ token, user: { id: user.id, email: user.email } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const secret = process.env.JWT_SECRET || "secret";
  const token = jwt.sign({ id: user.id }, secret);

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
};

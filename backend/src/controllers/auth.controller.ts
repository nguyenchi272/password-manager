import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Request, Response } from "express";
import prisma from "../utils/prisma.js";
import { sendVerifyEmail } from "../services/mail.service.js";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: "Email already used" });

  const hash = await bcrypt.hash(password, 10);

  const verifyToken = crypto.randomBytes(32).toString("hex");
  const verifyTokenExp = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      verifyToken,
      verifyTokenExp,
    },
  });

  await sendVerifyEmail(user.email, verifyToken);

  res.json({
    message: "Register success. Please check your email to verify.",
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  const user = await prisma.user.findFirst({
    where: {
      verifyToken: token as string,
      verifyTokenExp: { gt: new Date() },
    },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verifyToken: null,
      verifyTokenExp: null,
    },
  });

  res.json({ message: "Email verified successfully" });
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

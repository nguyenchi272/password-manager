import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email }});
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

  return { user, token };
};

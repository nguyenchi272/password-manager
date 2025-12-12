import { Request, Response } from "express";
import prisma from "../utils/prisma.js";
import { decrypt, encrypt } from "../utils/encryption.js";
import { url } from "inspector/promises";

export const getAccounts = async (req: Request, res: Response) => {
  const accounts = await prisma.account.findMany({
    where: { userId: Number(req.userId) }
  });
  
  const result = accounts.map((acc) => ({
    ...acc,
    password: decrypt(acc.password),
  }));

  res.json(result);
};

export const createAccount = async (req: Request, res: Response) => {
  const { title, username, password, url } = req.body;
  const encryptedPassword = encrypt(password);
  const account = await prisma.account.create({
    data: {
      title,
      username,
      password: encryptedPassword,
      url,
      userId: Number(req.userId),
    },
  });
  res.json(account);
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const id  = Number(req.params.id);
    const { title, username, password, url } = req.body;
    const encryptedPassword = encrypt(password);

    const account = await prisma.account.update({
      where: {
        id: id,
      },
      data: {
        title,
        username,
        password: encryptedPassword,
        url,
      },
    });

    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update account" });
  }
};


export const deleteAccount = async (req: Request, res: Response) => {
  await prisma.account.delete({
    where: { id: Number(req.params.id) }
  });
  res.json({ message: "Deleted" });
};

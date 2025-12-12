// src/api/Item.api.ts
import { client } from "./client";

export interface AccountDTO {
  id?: number;
  title: string;
  url?: string;
  username: string;
  password: string;
  note?: string;
}

export const ItemApi = {
  getAll: async (): Promise<AccountDTO[]> => {
    const res = await client.get("/accounts");
    return res.data;
  },

  create: async (data: AccountDTO): Promise<AccountDTO> => {
    const res = await client.post("/accounts", data);
    return res.data;
  },

  update: async (id: number, data: AccountDTO): Promise<AccountDTO> => {
    const res = await client.put(`/accounts/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/accounts/${id}`);
  },
};

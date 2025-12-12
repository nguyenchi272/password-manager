// src/state/Items.store.ts
import { create } from "zustand";
import { ItemApi, AccountDTO } from "../api/items.api";
import { message } from "antd";


interface ItemsStore {
  items: AccountDTO[];
  loading: boolean;

  fetchItems: () => Promise<void>;
  addItem: (data: AccountDTO) => Promise<void>;
  updateItem: (id: number, data: AccountDTO) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

export const useItemsStore = create<ItemsStore>((set, get) => ({
  items: [],
  loading: false,

  fetchItems: async () => {
    set({ loading: true });
    const items = await ItemApi.getAll();
    set({ items, loading: false });
  },

  addItem: async (data) => {
    const newItem = await ItemApi.create(data);
    set({ items: [...get().items, newItem] });
  },

  updateItem: async (id, data) => {
    const updated = await ItemApi.update(id, data);
    set({
      items: get().items.map((i) => (i.id === id ? updated : i)),
    });
  },

  deleteItem: async (id) => {
    await ItemApi.delete(id);
    set({
      items: get().items.filter((i) => i.id !== id),
    });

    message.success("Account deleted successfully");
    window.dispatchEvent(new Event("account-deleted"));
  },
}));

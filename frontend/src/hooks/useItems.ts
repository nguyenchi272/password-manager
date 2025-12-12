import { ItemApi } from "api/items.api";
import { useItemsStore } from "../state/items.store";

export function useItems() {
  const items = useItemsStore((s) => s.items);
  const addItem = useItemsStore((s) => s.addItem);
  const updateItem = useItemsStore((s) => s.updateItem);
  const deleteItem = useItemsStore((s) => s.deleteItem);

  const getItemById = (id: number) => {
    return items.find((i) => i.id === id);
  };

  return { items, addItem, updateItem, getItemById, deleteItem };
}

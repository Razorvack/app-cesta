import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { GroceryCategory, GroceryItem, GroceryTemplate } from "../types/shopping";

type ShoppingListContextValue = {
  items: GroceryItem[];
  addItem: (item: GroceryTemplate | { name: string; category?: GroceryCategory }) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearChecked: () => void;
};

const STORAGE_KEY = "app-cesta.items";
const ShoppingListContext = createContext<ShoppingListContextValue | undefined>(undefined);

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

function createItem(item: GroceryTemplate | { name: string; category?: GroceryCategory }): GroceryItem {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: normalizeName(item.name),
    category: item.category ?? "favorites",
    quantity: 1,
    checked: false,
    createdAt: Date.now()
  };
}

export function ShoppingListProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<GroceryItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((storedItems) => {
      if (storedItems) {
        setItems(JSON.parse(storedItems) as GroceryItem[]);
      }
    });
  }, []);

  useEffect(() => {
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<ShoppingListContextValue>(
    () => ({
      items,
      addItem: (item) => {
        const name = normalizeName(item.name);

        if (!name) {
          return;
        }

        setItems((currentItems) => {
          const existing = currentItems.find(
            (currentItem) => currentItem.name.toLocaleLowerCase() === name.toLocaleLowerCase()
          );

          if (existing) {
            return currentItems.map((currentItem) =>
              currentItem.id === existing.id
                ? { ...currentItem, quantity: currentItem.quantity + 1, checked: false }
                : currentItem
            );
          }

          return [createItem({ ...item, name }), ...currentItems];
        });
      },
      toggleItem: (id) => {
        setItems((currentItems) =>
          currentItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
        );
      },
      removeItem: (id) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
      },
      increaseQuantity: (id) => {
        setItems((currentItems) =>
          currentItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        );
      },
      decreaseQuantity: (id) => {
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          )
        );
      },
      clearChecked: () => {
        setItems((currentItems) => currentItems.filter((item) => !item.checked));
      }
    }),
    [items]
  );

  return <ShoppingListContext.Provider value={value}>{children}</ShoppingListContext.Provider>;
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);

  if (!context) {
    throw new Error("useShoppingList must be used within ShoppingListProvider");
  }

  return context;
}

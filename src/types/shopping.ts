export type ThemeMode = "light" | "dark";

export type GroceryCategory =
  | "favorites"
  | "produce"
  | "dairy"
  | "bakery"
  | "meat"
  | "pantry"
  | "frozen"
  | "cleaning";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  checked: boolean;
  createdAt: number;
};

export type GroceryTemplate = {
  name: string;
  category: GroceryCategory;
  icon: string;
};

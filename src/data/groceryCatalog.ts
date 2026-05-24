import { GroceryCategory, GroceryTemplate } from "../types/shopping";

export const categoryLabels: Record<GroceryCategory, string> = {
  favorites: "Favoritos",
  produce: "Fruta y verdura",
  dairy: "Lacteos",
  bakery: "Panaderia",
  meat: "Carne y pescado",
  pantry: "Despensa",
  frozen: "Congelados",
  cleaning: "Limpieza"
};

export const categoryOrder: GroceryCategory[] = [
  "favorites",
  "produce",
  "dairy",
  "bakery",
  "meat",
  "pantry",
  "frozen",
  "cleaning"
];

export const groceryCatalog: GroceryTemplate[] = [
  { name: "Leche", category: "dairy", icon: "cafe-outline" },
  { name: "Yogur", category: "dairy", icon: "ice-cream-outline" },
  { name: "Queso", category: "dairy", icon: "pizza-outline" },
  { name: "Huevos", category: "favorites", icon: "egg-outline" },
  { name: "Pan", category: "bakery", icon: "restaurant-outline" },
  { name: "Croissants", category: "bakery", icon: "cafe-outline" },
  { name: "Manzanas", category: "produce", icon: "nutrition-outline" },
  { name: "Platanos", category: "produce", icon: "leaf-outline" },
  { name: "Tomates", category: "produce", icon: "ellipse-outline" },
  { name: "Lechuga", category: "produce", icon: "leaf-outline" },
  { name: "Pollo", category: "meat", icon: "fast-food-outline" },
  { name: "Salmon", category: "meat", icon: "fish-outline" },
  { name: "Arroz", category: "pantry", icon: "cube-outline" },
  { name: "Pasta", category: "pantry", icon: "albums-outline" },
  { name: "Aceite", category: "pantry", icon: "water-outline" },
  { name: "Cafe", category: "pantry", icon: "cafe-outline" },
  { name: "Pizza", category: "frozen", icon: "pizza-outline" },
  { name: "Verduras mix", category: "frozen", icon: "snow-outline" },
  { name: "Detergente", category: "cleaning", icon: "sparkles-outline" },
  { name: "Papel cocina", category: "cleaning", icon: "document-text-outline" }
];

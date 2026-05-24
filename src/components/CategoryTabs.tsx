import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { categoryLabels, categoryOrder } from "../data/groceryCatalog";
import { useAppTheme } from "../context/ThemeContext";
import { GroceryCategory } from "../types/shopping";

type CategoryTabsProps = {
  selectedCategory: GroceryCategory | "all";
  onSelectCategory: (category: GroceryCategory | "all") => void;
};

export function CategoryTabs({ selectedCategory, onSelectCategory }: CategoryTabsProps) {
  const { palette } = useAppTheme();
  const tabs: Array<GroceryCategory | "all"> = ["all", ...categoryOrder];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {tabs.map((category) => {
        const selected = selectedCategory === category;
        const label = category === "all" ? "Todo" : categoryLabels[category];

        return (
          <Pressable
            key={category}
            onPress={() => onSelectCategory(category)}
            style={[
              styles.tab,
              {
                backgroundColor: selected ? palette.primary : palette.chip,
                borderColor: selected ? palette.primary : palette.border
              }
            ]}
          >
            <Text style={[styles.label, { color: selected ? "#FFFFFF" : palette.text }]}>{label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 4
  },
  tab: {
    height: 36,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14
  },
  label: {
    fontSize: 14,
    fontWeight: "700"
  }
});

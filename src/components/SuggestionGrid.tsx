import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { groceryCatalog } from "../data/groceryCatalog";
import { useAppTheme } from "../context/ThemeContext";
import { GroceryCategory, GroceryTemplate } from "../types/shopping";

type SuggestionGridProps = {
  selectedCategory: GroceryCategory | "all";
  onAddItem: (item: GroceryTemplate) => void;
};

export function SuggestionGrid({ selectedCategory, onAddItem }: SuggestionGridProps) {
  const { palette } = useAppTheme();
  const items = groceryCatalog.filter((item) => selectedCategory === "all" || item.category === selectedCategory);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => `${item.category}-${item.name}`}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onAddItem(item)}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: palette.surface,
              borderColor: palette.border,
              shadowColor: palette.shadow,
              opacity: pressed ? 0.74 : 1
            }
          ]}
        >
          <View style={[styles.iconBox, { backgroundColor: palette.primaryMuted }]}>
            <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={22} color={palette.primary} />
          </View>
          <Text numberOfLines={2} style={[styles.name, { color: palette.text }]}>
            {item.name}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 10,
    paddingHorizontal: 20
  },
  row: {
    gap: 10
  },
  card: {
    flex: 1,
    minHeight: 88,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2
  },
  iconBox: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 10
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 19
  }
});

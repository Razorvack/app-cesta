import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { CategoryTabs } from "../components/CategoryTabs";
import { IconButton } from "../components/IconButton";
import { ShoppingItemRow } from "../components/ShoppingItemRow";
import { SuggestionGrid } from "../components/SuggestionGrid";
import { useShoppingList } from "../context/ShoppingListContext";
import { useAppTheme } from "../context/ThemeContext";
import { GroceryCategory } from "../types/shopping";

export function ShoppingListScreen() {
  const insets = useSafeAreaInsets();
  const { palette, mode, toggleTheme } = useAppTheme();
  const { items, addItem, toggleItem, removeItem, increaseQuantity, decreaseQuantity, clearChecked } = useShoppingList();
  const [selectedCategory, setSelectedCategory] = useState<GroceryCategory | "all">("all");
  const [customItemName, setCustomItemName] = useState("");

  const pendingItems = useMemo(() => items.filter((item) => !item.checked), [items]);
  const checkedItems = useMemo(() => items.filter((item) => item.checked), [items]);

  const submitCustomItem = () => {
    addItem({ name: customItemName, category: selectedCategory === "all" ? "favorites" : selectedCategory });
    setCustomItemName("");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: palette.background, paddingTop: insets.top }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 28 }]}>
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            <Text style={[styles.kicker, { color: palette.primary }]}>Supermercado</Text>
            <Text style={[styles.title, { color: palette.text }]}>Mi cesta</Text>
          </View>
          <IconButton
            icon={mode === "dark" ? "sunny-outline" : "moon-outline"}
            label="Cambiar tema"
            onPress={toggleTheme}
          />
        </View>

        <View style={[styles.summary, { backgroundColor: palette.primary, shadowColor: palette.shadow }]}>
          <View>
            <Text style={styles.summaryNumber}>{pendingItems.length}</Text>
            <Text style={styles.summaryLabel}>pendientes</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View>
            <Text style={styles.summaryNumber}>{checkedItems.length}</Text>
            <Text style={styles.summaryLabel}>comprados</Text>
          </View>
          <Pressable
            disabled={checkedItems.length === 0}
            onPress={clearChecked}
            style={[styles.clearButton, { opacity: checkedItems.length === 0 ? 0.48 : 1 }]}
          >
            <Ionicons name="sparkles-outline" size={17} color="#FFFFFF" />
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </Pressable>
        </View>

        <View style={[styles.inputPanel, { backgroundColor: palette.surface, borderColor: palette.border }]}>
          <TextInput
            value={customItemName}
            onChangeText={setCustomItemName}
            onSubmitEditing={submitCustomItem}
            placeholder="Añadir producto"
            placeholderTextColor={palette.muted}
            returnKeyType="done"
            style={[styles.input, { color: palette.text }]}
          />
          <Pressable onPress={submitCustomItem} style={[styles.addButton, { backgroundColor: palette.primary }]}>
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        <CategoryTabs selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: palette.text }]}>Toca para añadir</Text>
          <SuggestionGrid selectedCategory={selectedCategory} onAddItem={addItem} />
        </View>

        <View style={[styles.section, styles.listSection]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, styles.sectionTitleInsetless, { color: palette.text }]}>Lista actual</Text>
            <Text style={[styles.sectionMeta, { color: palette.muted }]}>
              {items.length === 1 ? "1 producto" : `${items.length} productos`}
            </Text>
          </View>

          {items.length === 0 ? (
            <View style={[styles.empty, { borderColor: palette.border, backgroundColor: palette.surface }]}>
              <Ionicons name="basket-outline" size={28} color={palette.primary} />
              <Text style={[styles.emptyTitle, { color: palette.text }]}>Tu cesta esta vacia</Text>
              <Text style={[styles.emptyCopy, { color: palette.muted }]}>
                Añade productos desde las sugerencias o escribe uno nuevo.
              </Text>
            </View>
          ) : (
            <View style={styles.items}>
              {[...pendingItems, ...checkedItems].map((item) => (
                <ShoppingItemRow
                  key={item.id}
                  item={item}
                  onToggle={toggleItem}
                  onRemove={removeItem}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    gap: 18
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18
  },
  titleBlock: {
    flex: 1,
    minWidth: 0
  },
  kicker: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  title: {
    marginTop: 2,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0
  },
  summary: {
    minHeight: 104,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 18,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 4
  },
  summaryNumber: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900"
  },
  summaryLabel: {
    color: "rgba(255, 255, 255, 0.82)",
    fontSize: 12,
    fontWeight: "800"
  },
  summaryDivider: {
    width: 1,
    height: 42,
    marginHorizontal: 18,
    backgroundColor: "rgba(255, 255, 255, 0.32)"
  },
  clearButton: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: "auto",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.38)",
    paddingHorizontal: 12
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800"
  },
  inputPanel: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 6
  },
  input: {
    flex: 1,
    height: 54,
    fontSize: 16,
    fontWeight: "700"
  },
  addButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  section: {
    gap: 10
  },
  listSection: {
    paddingHorizontal: 20
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between"
  },
  sectionTitle: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "900"
  },
  sectionTitleInsetless: {
    paddingHorizontal: 0
  },
  sectionMeta: {
    fontSize: 12,
    fontWeight: "800"
  },
  items: {
    gap: 10
  },
  empty: {
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20
  },
  emptyTitle: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "900"
  },
  emptyCopy: {
    marginTop: 6,
    maxWidth: 260,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20
  }
});

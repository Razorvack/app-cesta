import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { categoryLabels } from "../data/groceryCatalog";
import { useAppTheme } from "../context/ThemeContext";
import { GroceryItem } from "../types/shopping";

type ShoppingItemRowProps = {
  item: GroceryItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
};

export function ShoppingItemRow({ item, onToggle, onRemove, onIncrease, onDecrease }: ShoppingItemRowProps) {
  const { palette } = useAppTheme();

  return (
    <View style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.checked }}
        onPress={() => onToggle(item.id)}
        style={[styles.check, { borderColor: item.checked ? palette.success : palette.border }]}
      >
        {item.checked ? <Ionicons name="checkmark" size={18} color={palette.success} /> : null}
      </Pressable>

      <View style={styles.info}>
        <Text
          numberOfLines={1}
          style={[
            styles.name,
            {
              color: item.checked ? palette.muted : palette.text,
              textDecorationLine: item.checked ? "line-through" : "none"
            }
          ]}
        >
          {item.name}
        </Text>
        <Text numberOfLines={1} style={[styles.category, { color: palette.muted }]}>
          {categoryLabels[item.category]}
        </Text>
      </View>

      <View style={[styles.quantity, { backgroundColor: palette.elevated }]}>
        <Pressable accessibilityLabel="Restar unidad" onPress={() => onDecrease(item.id)} style={styles.stepper}>
          <Ionicons name="remove" size={16} color={palette.text} />
        </Pressable>
        <Text style={[styles.quantityText, { color: palette.text }]}>{item.quantity}</Text>
        <Pressable accessibilityLabel="Sumar unidad" onPress={() => onIncrease(item.id)} style={styles.stepper}>
          <Ionicons name="add" size={16} color={palette.text} />
        </Pressable>
      </View>

      <Pressable accessibilityLabel="Eliminar producto" onPress={() => onRemove(item.id)} style={styles.remove}>
        <Ionicons name="trash-outline" size={19} color={palette.danger} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  check: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2
  },
  info: {
    flex: 1,
    minWidth: 0
  },
  name: {
    fontSize: 16,
    fontWeight: "800"
  },
  category: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "600"
  },
  quantity: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8
  },
  stepper: {
    width: 30,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  quantityText: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800"
  },
  remove: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center"
  }
});

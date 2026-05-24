import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import { useAppTheme } from "../context/ThemeContext";

type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export function IconButton({ icon, label, onPress }: IconButtonProps) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.elevated, borderColor: palette.border, opacity: pressed ? 0.72 : 1 }
      ]}
    >
      <Ionicons name={icon} size={22} color={palette.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1
  }
});

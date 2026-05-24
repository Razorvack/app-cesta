import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { ShoppingListScreen } from "./src/screens/ShoppingListScreen";
import { ShoppingListProvider } from "./src/context/ShoppingListContext";
import { ThemeProvider, useAppTheme } from "./src/context/ThemeContext";

function AppContent() {
  const { mode } = useAppTheme();

  return (
    <>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <ShoppingListProvider>
        <ShoppingListScreen />
      </ShoppingListProvider>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

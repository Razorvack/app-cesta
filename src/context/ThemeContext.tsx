import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { AppPalette, palettes } from "../theme/palette";
import { ThemeMode } from "../types/shopping";

type ThemeContextValue = {
  mode: ThemeMode;
  palette: AppPalette;
  toggleTheme: () => void;
};

const STORAGE_KEY = "app-cesta.theme";
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((storedMode) => {
      if (storedMode === "light" || storedMode === "dark") {
        setMode(storedMode);
      }
    });
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const nextMode = mode === "light" ? "dark" : "light";

    return {
      mode,
      palette: palettes[mode],
      toggleTheme: () => {
        setMode(nextMode);
        void AsyncStorage.setItem(STORAGE_KEY, nextMode);
      }
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within ThemeProvider");
  }

  return context;
}

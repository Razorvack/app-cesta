import { ThemeMode } from "../types/shopping";

export type AppPalette = {
  mode: ThemeMode;
  background: string;
  surface: string;
  elevated: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  primaryMuted: string;
  success: string;
  danger: string;
  chip: string;
  shadow: string;
};

export const palettes: Record<ThemeMode, AppPalette> = {
  light: {
    mode: "light",
    background: "#F7F8F4",
    surface: "#FFFFFF",
    elevated: "#F0F4EC",
    text: "#18211A",
    muted: "#667165",
    border: "#DDE5D8",
    primary: "#1F8A4C",
    primaryMuted: "#E0F3E7",
    success: "#2F9E44",
    danger: "#D94848",
    chip: "#EEF2EA",
    shadow: "rgba(24, 33, 26, 0.12)"
  },
  dark: {
    mode: "dark",
    background: "#101612",
    surface: "#18221B",
    elevated: "#223027",
    text: "#F5F7F2",
    muted: "#A7B1A7",
    border: "#314236",
    primary: "#55C97A",
    primaryMuted: "#20422C",
    success: "#63D884",
    danger: "#FF8585",
    chip: "#25362A",
    shadow: "rgba(0, 0, 0, 0.28)"
  }
};

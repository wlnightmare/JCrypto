import { createContext } from "react";
import { ThemeContextType } from "./types";

export const themes = {
  dark: "",
  light: "white-content",
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  changeTheme: () => {},
});

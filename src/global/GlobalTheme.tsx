import React from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type ThemeProps = {
  children: JSX.Element;
};

export const GlobalPallete = {
  colors: {
    primary: "#86c232",
    secondary: "#61892F",
    background: "#222629",
    lightGrey: "#6B6E70",
    darkGrey: "#474B4F",
    white: "#FFFFFF",
  },
};

const MaterialUIPallet = createTheme({
  palette: {
    primary: {
      main: GlobalPallete.colors.primary,
    },
    secondary: {
      main: GlobalPallete.colors.secondary,
    },
  },
});

const GlobalTheme = ({ children }: ThemeProps) => {
  return (
    <ThemeProvider theme={MaterialUIPallet}>
      <StyledComponentsThemeProvider theme={GlobalPallete}>
        {children}
      </StyledComponentsThemeProvider>
    </ThemeProvider>
  );
};

export default GlobalTheme;

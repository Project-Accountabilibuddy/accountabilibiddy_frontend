import React from "react";
import { ThemeProvider } from "styled-components";

type ThemeProps = {
  children: JSX.Element;
};

export const theme = {
  colors: {
    primary: "#86c232",
    secondary: "#61892F",
    background: "#222629",
    lightGrey: "#6B6E70",
    darkGrey: "#474B4F",
    white: "#FFFFFF",
  },
};

const GlobalTheme = ({ children }: ThemeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default GlobalTheme;

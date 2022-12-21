import React from "react";
import { ThemeProvider } from "styled-components";

type ThemeProps = {
  children: JSX.Element;
};

export const theme = {
  colors: {
    primary: "#1460AA",
    primaryLight: "#588DDC",
    primaryDark: "#00377A",
    secondary: "#00838F",
    secondaryLight: "#4FB3BF",
    secondaryDark: "#005662",
    error: "#B00020",
    white: "#FFFFFF",
    black: "#000000",
    black87: "rgba(0, 0, 0, 0.87)",
    black60: "rgba(0, 0, 0, 0.6)",
    black34: "rgba(0, 0, 0, 0.34)",
    black12: "rgba(0, 0, 0, 0.12)",
    lightGrey: "#F2F2F2",
    success: "#2E7D32",
    alert: "#DC7700",
    primary24: "#4C86BE",
    primary12: "#E3ECF5",
    primary4: "#F6F9FC",
    errorBg: "#FAF0F2",
    successBg: "#F2F7F3",
    alertBg: "#FDF7F0",
    background: "#FAFAFA",
    adBg: "#E8FBFE",
    loading: "#f0f0f0",
  },
};

const GlobalTheme = ({ children }: ThemeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default GlobalTheme;

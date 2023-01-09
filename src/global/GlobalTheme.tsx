import React from 'react'
import styled from 'styled-components'
import { createTheme, ThemeProvider } from '@mui/material/styles'

interface ThemeProps {
  children: JSX.Element
}

export const GlobalPallete = {
  colors: {
    primary: '#86c232',
    secondary: '#61892F',
    background: '#222629',
    lightGrey: '#6B6E70',
    darkGrey: '#474B4F',
    white: '#FFFFFF'
  }
}

const CSSVariables = styled.div`
  --color-primary: ${GlobalPallete.colors.primary};
  --color-secondary: ${GlobalPallete.colors.secondary};
  --color-background: ${GlobalPallete.colors.background};
  --color-light-grey: ${GlobalPallete.colors.lightGrey};
  --color-dark-grey: ${GlobalPallete.colors.darkGrey};
  --color-white: ${GlobalPallete.colors.white};

  --height-top-bar: 60px;
`

const MaterialUIPallet = createTheme({
  palette: {
    primary: {
      main: GlobalPallete.colors.primary
    },
    secondary: {
      main: GlobalPallete.colors.secondary
    }
  }
})

const GlobalTheme = ({ children }: ThemeProps): JSX.Element => {
  return (
    <CSSVariables>
      <ThemeProvider theme={MaterialUIPallet}>{children}</ThemeProvider>
    </CSSVariables>
  )
}

export default GlobalTheme

import React from 'react'
import styled from 'styled-components'
import { createTheme, ThemeProvider } from '@mui/material/styles'

interface ThemeProps {
  children: JSX.Element
}

export const GlobalPallete = {
  colors: {
    primary: '#3CFFD5',
    secondary: '#4333A3',
    background: '#222629',
    lightGrey: '#6B6E70',
    darkGrey: '#474B4F',
    white: '#FFFFFF',
    red: '#FF424A',
    black: '#000000'
  }
}

const CSSVariables = styled.div`
  --color-primary: ${GlobalPallete.colors.primary};
  --color-secondary: ${GlobalPallete.colors.secondary};
  --color-background: ${GlobalPallete.colors.background};
  --color-light-grey: ${GlobalPallete.colors.lightGrey};
  --color-dark-grey: ${GlobalPallete.colors.darkGrey};
  --color-white: ${GlobalPallete.colors.white};
  --color-red: ${GlobalPallete.colors.red};
  --color-black: ${GlobalPallete.colors.black};

  --height-top-bar: 54px;
`

const MaterialUIPallet = createTheme({
  palette: {
    mode: 'dark',
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

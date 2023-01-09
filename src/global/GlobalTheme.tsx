import React from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider
} from 'styled-components'
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

// TODO: FULLY UTILIZE CSS VARIABLES IN PLACE OF STYLED THEMEPROVIDER
const CSSVariables = styled.div`
  --top-bar-height: 60px;
  --color-err: #ff0000;
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
      <ThemeProvider theme={MaterialUIPallet}>
        <StyledComponentsThemeProvider theme={GlobalPallete}>
          {children}
        </StyledComponentsThemeProvider>
      </ThemeProvider>
    </CSSVariables>
  )
}

export default GlobalTheme

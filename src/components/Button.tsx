import React from 'react'
import styled from 'styled-components'
import MaterialUIButton from '@mui/material/Button'

interface ButtonProps {
  text: string
  className?: string
  variant?: 'text' | 'outlined' | 'contained'
  onClick?: () => void
}

const StyledButton = styled(MaterialUIButton)`
  height: 48px;
  text-transform: initial;
  font-family: 'Ubuntu Mono', monospace;
  font-size: 18px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0px;
  text-align: center;
  line-height: 22px;

  :hover {
    color: var(--color-white);
    background: linear-gradient(
      0deg,
      var(--color-primary),
      var(--color-secondary)
    );
  }
`

const Button = ({
  text,
  className,
  variant,
  onClick
}: ButtonProps): JSX.Element => {
  return (
    <StyledButton className={className} variant={variant} onClick={onClick}>
      {text}
    </StyledButton>
  )
}

export default Button

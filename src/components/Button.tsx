import React from 'react'
import styled from 'styled-components'
import MaterialUIButton from '@mui/material/Button'

interface ButtonProps {
  text: string
  className?: string
  variant?: 'text' | 'outlined' | 'contained'
  onClick?: () => void
  disabled?: boolean
}

const StyledButton = styled.div`
  button {
    height: 48px;
    border: 1px solid var(--color-primary);
    border-radius: 2px;
    text-transform: initial;
    color: var(--color-primary);

    :hover {
      color: var(--color-white);
      background: linear-gradient(
        0deg,
        var(--color-secondary),
        var(--color-primary)
      );
    }
  }
`

const Button = ({
  text,
  className = '',
  variant,
  onClick,
  disabled = false
}: ButtonProps): JSX.Element => {
  return (
    <StyledButton>
      <MaterialUIButton
        className={`${className} body-2`}
        variant={variant}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </MaterialUIButton>
    </StyledButton>
  )
}

export default Button

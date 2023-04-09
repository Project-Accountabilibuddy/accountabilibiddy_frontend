import React from 'react'
import styled from 'styled-components'
import MaterialUIButton from '@mui/material/Button'

type ButtonProps = {
  text: string
  onClick: () => void
  variant?: 'text' | 'outlined' | 'contained'
  className?: string
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
  onClick,
  variant = 'outlined',
  className = '',
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

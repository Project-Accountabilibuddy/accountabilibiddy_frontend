import React from 'react'
import styled from 'styled-components'

interface GlobalTypographyProps {
  children: JSX.Element
}

const StyledGlobalTypography = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    animation: fadein 2s;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  // TODO: REMOVE ONCE ALL BUTTONS ARE HANDLED BY NEW BUTTON COMPONENT
  button {
    height: 48px;
    text-transform: initial;
    opacity: 1;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 18px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 22px;
  }

  .heading-1 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Prompt', sans-serif;
    font-size: 38px;
    font-weight: 300;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 42px;
  }

  .heading-2 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Prompt', sans-serif;
    font-size: 28px;
    font-weight: 300;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 30px;
  }

  .heading-3 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Prompt', sans-serif;
    font-size: 24px;
    font-weight: 300;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 28px;
  }

  .body-1 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Ubuntu Mono', monospace;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 24px;
  }

  .body-2 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Ubuntu Mono', monospace;
    font-size: 18px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 22px;
  }

  .caption {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Ubuntu Mono', monospace;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 20px;
  }
`

const GlobalTypography = ({ children }: GlobalTypographyProps): JSX.Element => {
  return <StyledGlobalTypography>{children}</StyledGlobalTypography>
}

export default GlobalTypography

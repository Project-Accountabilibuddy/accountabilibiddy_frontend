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

  svg,
  input,
  img,
  button {
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
    font-size: 1.1rem;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 1.3rem;
  }

  .heading-1 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Prompt', sans-serif;
    font-size: 2.4rem;
    font-weight: 300;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 2.6rem;
  }

  .heading-2 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Prompt', sans-serif;
    font-size: 1.75rem;
    font-weight: 300;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 1.8rem;
  }

  .heading-3 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Prompt', sans-serif;
    font-size: 1.5rem;
    font-weight: 300;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 1.7rem;
  }

  .body-1 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Ubuntu Mono', monospace;
    font-size: 1.2rem;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 1.5rem;
  }

  .body-2 {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Ubuntu Mono', monospace;
    font-size: 1.1rem;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 1.3rem;
  }

  .caption {
    opacity: 1;
    color: var(--color-white);
    font-family: 'Ubuntu Mono', monospace;
    font-size: 1rem;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0px;
    text-align: center;
    line-height: 1.2rem;
  }
`

const GlobalTypography = ({ children }: GlobalTypographyProps): JSX.Element => {
  return <StyledGlobalTypography>{children}</StyledGlobalTypography>
}

export default GlobalTypography

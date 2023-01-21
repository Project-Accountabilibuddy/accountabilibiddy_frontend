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

  .heading-1 {
    font-style: normal;
    font-weight: normal;
    font-size: 38px;
    line-height: 42px;
    letter-spacing: 0.25px;
    font-family: 'Anton', sans-serif;
    color: var(--color-white);
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .heading-2 {
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 30px;
    font-family: 'Anton', sans-serif;
    color: var(--color-white);
  }

  .heading-3 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    font-family: 'Anton', sans-serif;
    color: var(--color-white);
    letter-spacing: 0.15px;
    margin: 48px auto 34px;
  }

  .body-1 {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    font-family: 'Anton', sans-serif;
    color: var(--color-white);
    letter-spacing: 0.5px;
    text-align: center;
  }

  .body-2 {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    font-family: 'Anton', sans-serif;
    color: var(--color-white);
    letter-spacing: 0.25px;
  }

  .subtitle {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
    font-family: 'Anton', sans-serif;
    color: var(--color-white);
    letter-spacing: 0.15px;
  }

  .subtitle-2 {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    font-family: 'Anton', sans-serif;
    color: var(--color-white);
    letter-spacing: 0.1px;
  }

  .caption {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    font-family: 'Anton', sans-serif;
    color: var(--color-white);
    letter-spacing: 0.4px;
  }

  .label {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    font-family: 'Anton', sans-serif;
    color: var(--color-white);
    letter-spacing: 0.4px;
  }

  .bold {
    font-weight: bold;
  }
`

const GlobalTypography = ({ children }: GlobalTypographyProps): JSX.Element => {
  return <StyledGlobalTypography>{children}</StyledGlobalTypography>
}

export default GlobalTypography

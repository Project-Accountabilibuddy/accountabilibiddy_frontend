import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Button from '../components/Button'

const StyledQuotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20%;

  .title {
    margin-bottom: 48px;
    font-size: 5rem;
  }

  .subheading_text {
    margin-bottom: 48px;
    color: var(--color-light-grey);
  }

  .quotes {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`

const Quotes = (): JSX.Element => {
  const handleGetQuotes = async (): Promise<any> => {
    try {
      const response = await fetch('https://zenquotes.io/api/quotes/')

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledQuotes>
      <h1 className="heading-1 title">Quotes</h1>
      <h4 className="heading-1 subheading_text">
        Here are some quotes about love
      </h4>
      <div className="quotes"></div>
      <Button
        variant="outlined"
        onClick={() => handleGetQuotes()}
        text="Get Quotes"
      />
    </StyledQuotes>
  )
}

export default Quotes

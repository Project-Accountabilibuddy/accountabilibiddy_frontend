import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Button from '../components/Button'
import QuoteCard from '../components/QuoteCard'

interface Quote {
  q: string
  a: string
  h: string
}

const StyledQuotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20%;

  .title {
    margin-bottom: 48px;
  }

  .quotes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 12px;
    margin-bottom: 24px;
  }

  @media (max-width: 1024px) {
    .quotes {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .quotes {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`

let DUMMY_QUOTES = new Array(12).fill(0)

const Quotes = (): JSX.Element => {
  const [quotes, setQuotes] = React.useState<Quote[]>(DUMMY_QUOTES)

  // todo: auto call on filter change
  const handleGetQuotes = async (): Promise<any> => {
    try {
      console.log('i got here')
      const myKey = '7c5e0fd68ce088e5a460c5e742c128e9'
      const response = await fetch(`https://zenquotes.io/api/quotes/${myKey}}`)

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledQuotes>
      <h1 className="heading-1 title">Quotes</h1>
      <div className="quotes">
        {quotes.map((quote, index) => {
          return <QuoteCard key={index} className={'quote'} />
        })}
      </div>

      <Button
        variant="outlined"
        onClick={() => handleGetQuotes()}
        text="Get Quotes"
      />
    </StyledQuotes>
  )
}

export default Quotes

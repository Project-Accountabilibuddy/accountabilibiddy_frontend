import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import QuoteCard from '../components/QuoteCard'

const ZEN_QUOTES_KEY = '7c5e0fd68ce088e5a460c5e742c128e9'

interface Quote {
  q: string
  a: string
}

interface KeyWordOption {
  k: string
  l: string
}

const StyledQuotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 124px);

  .title {
    margin-bottom: 48px;
  }

  .quote_view_manfilterTextment_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .text_field {
      margin-bottom: 24px;
      width: 200px;

      .visibility_icon:hover {
        cursor: pointer;
      }
    }
  }

  .scroll_container {
    width: -webkit-fill-available;
    height: calc(100vh - 200px);
    overflow: scroll;
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    .loading_quotes {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    .quotes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 12px;
      margin-bottom: 24px;
    }
  }

  @media (max-width: 1024px) {
    .scroll_container {
      .quotes {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  @media (max-width: 768px) {
    .scroll_container {
      .quotes {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`

// todo: update to generaly be more testable
const Quotes = (): JSX.Element => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)

  const [keyWordOptions, setKeyWordOptions] = useState<KeyWordOption[]>([])
  const [chosenKeyWord, setChosenKeyWord] = useState('')

  const handleGetQuotes = async (chosenKeyWord: string): Promise<any> => {
    setLoading(true)
    try {
      // todo: move key to .env file
      const response = await fetch(
        chosenKeyWord === ''
          ? `https://zenquotes.io/api/quotes/${ZEN_QUOTES_KEY}`
          : `https://zenquotes.io/api/quotes/${ZEN_QUOTES_KEY}}]&keyword=${chosenKeyWord}`
      )

      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      console.log('ERROR FETCHING QUITES: ', error)
    }
  }

  useEffect(() => {
    const getAllKeyWordOptions = async (): Promise<any> => {
      try {
        const response = await fetch(
          `https://zenquotes.io/api/keywords/[${ZEN_QUOTES_KEY}]`
        )

        const data = await response.json()
        setKeyWordOptions(data)
      } catch (error) {
        console.log('ERROR FETCHING QUITES: ', error)
      }
    }

    getAllKeyWordOptions().finally(() => {
      console.log('keyWordOptions: ', keyWordOptions)
    })
  }, [])

  useEffect(() => {
    handleGetQuotes(chosenKeyWord).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }, [chosenKeyWord])

  return (
    <StyledQuotes>
      <h1 className="heading-1 title">Quotes</h1>
      <div className="quote_view_manfilterTextment_header">
        <Select
          className="text_field"
          variant="outlined"
          value={chosenKeyWord}
          onChange={(event) => {
            setChosenKeyWord(event.target.value)
          }}
        >
          {keyWordOptions.map((keyWordOption) => {
            return (
              <MenuItem key={keyWordOption.k} value={keyWordOption.k}>
                {keyWordOption.k}
              </MenuItem>
            )
          })}
        </Select>
        <h5 className="caption">{`Quotes in view: ${quotes.length}`}</h5>
      </div>
      <div className="scroll_container">
        {loading && (
          <div className="loading_quotes">
            <CircularProgress />
          </div>
        )}
        {!loading && (
          <div className="quotes">
            {quotes.map((quote, index) => {
              const { q: quoteTitle, a: subquoteTitle } = quote
              return (
                <QuoteCard
                  key={index}
                  quoteTitle={quoteTitle}
                  subquoteTitle={subquoteTitle}
                />
              )
            })}
          </div>
        )}
      </div>
    </StyledQuotes>
  )
}

export default Quotes

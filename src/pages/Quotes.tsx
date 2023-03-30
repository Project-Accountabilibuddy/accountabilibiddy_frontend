import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import QuoteCard from '../components/QuoteCard'

interface Quote {
  q: string
  a: string
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

  .quote_view_manfilterTextment_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .text_field {
      margin-bottom: 24px;
      width: 400px;

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

const Quotes = (): JSX.Element => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)

  const [searchText, setSearchText] = useState('')
  const [filterText, setFilterText] = useState('')

  // todo: auto call on filter change
  const handleGetQuotes = async (filterText: string): Promise<any> => {
    setLoading(true)
    try {
      const ZEN_QUOTES_KEY = '7c5e0fd68ce088e5a460c5e742c128e9'
      const response = await fetch(
        filterText === ''
          ? `https://zenquotes.io/api/quotes/${ZEN_QUOTES_KEY}`
          : `https://zenquotes.io/api/quotes/${ZEN_QUOTES_KEY}}]&keyword=${filterText}`
      )

      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      console.log('ERROR FETCHING QUITES: ', error)
    }
  }

  useEffect(() => {
    handleGetQuotes(filterText).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }, [filterText])

  useEffect(() => {
    let searchedQuotes: Quote[] = []
    if (searchText !== '') {
      searchedQuotes = quotes.filter((quote) => {
        const { q, a } = quote
        return (
          q.toLowerCase().includes(searchText.toLowerCase()) ||
          a.toLowerCase().includes(searchText.toLowerCase())
        )
      })
      setQuotes(searchedQuotes)
    }
  }, [searchText])

  return (
    <StyledQuotes>
      <h1 className="heading-1 title">Quotes</h1>
      <div className="quote_view_manfilterTextment_header">
        <TextField
          className="text_field"
          variant="standard"
          label="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
        <Select
          className="text_field"
          variant="standard"
          value={filterText}
          label="filterText"
          onChange={(event) => {
            setFilterText(event.target.value)
          }}
        >
          <MenuItem value={'love'}>Love</MenuItem>
          <MenuItem value={'life'}>Life</MenuItem>
          <MenuItem value={'happiness'}>Happiness</MenuItem>
        </Select>
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

import React from 'react'
import styled from 'styled-components'

interface QuoteCardProps {
  quoteTitle?: string
  subquoteTitle?: string
}

const StyledQuoteCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 14rem;
  height: 10rem;
  border: 1px solid var(--color-primary);
  border-radius: 2px;
  padding: 1rem;

  .quote_title {
    margin-bottom: 8px;
  }

  .subquote_title {
    color: var(--color-light-grey);
  }
`

const QuoteCard = ({
  quoteTitle = '',
  subquoteTitle = ''
}: QuoteCardProps): JSX.Element => {
  return (
    <StyledQuoteCard>
      <h4 className="caption quote_title">{quoteTitle}</h4>
      <h4 className="caption subquote_title">{`-${subquoteTitle}`}</h4>
    </StyledQuoteCard>
  )
}

export default QuoteCard

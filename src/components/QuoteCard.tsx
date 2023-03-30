import React from 'react'
import styled from 'styled-components'

interface QuoteCardProps {
  quoteTitle?: string
  subquoteTitle?: string
  imageUri?: string
}

const StyledQuoteCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-primary);
  border-radius: 2px;
  padding: 1.2rem;

  .quote_title {
    margin-bottom: 8px;
  }

  .author_info {
    display: flex;
    align-items: center;
    flex-direction: column;

    .subquote_title {
      color: var(--color-light-grey);
      margin-bottom: 8px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 18px;
    }
  }
`

const QuoteCard = ({
  quoteTitle = '',
  subquoteTitle = '',
  imageUri = ''
}: QuoteCardProps): JSX.Element => {
  return (
    <StyledQuoteCard>
      <h4 className="caption quote_title">{quoteTitle}</h4>
      <div className="author_info">
        <h4 className="caption subquote_title">{`-${subquoteTitle}`}</h4>
        <img src={imageUri} />
      </div>
    </StyledQuoteCard>
  )
}

export default QuoteCard

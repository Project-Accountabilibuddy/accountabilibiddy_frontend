import React from 'react'
import styled from 'styled-components'
import MaterialUIButton from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../global/Types'
import Button from '../components/Button'

const StyledNotFoundPage = styled.div`
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

  button {
    margin-bottom: 24px;
    width: 400px;
    color: var(--color-primary);
  }
`

const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <StyledNotFoundPage>
      <h1 className="heading-1 title">404</h1>
      <h4 className="heading-1 subheading_text">
        This page does not exist my person
      </h4>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(ROUTES.LANDING)
        }}
        text="Got to landing page"
      />
      <MaterialUIButton
        variant="text"
        onClick={() => {
          navigate(ROUTES.AUTH)
        }}
      >
        Got to auth page
      </MaterialUIButton>
    </StyledNotFoundPage>
  )
}

export default NotFoundPage

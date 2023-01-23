import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import PersonIcon from '@mui/icons-material/Person'
import { Auth } from 'aws-amplify'

import { ROUTES } from '../global/Constants'

const StyledLanding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20%;
  height: 100%;

  .heading-1 {
    color: var(--color-primary);
    margin-bottom: 24px;
  }

  .heading-2 {
    color: var(--color-light-grey);
    margin-bottom: 24px;
  }

  .body-1 {
    color: var(--color-light-grey);
    margin-bottom: 24px;
  }

  .auth_options {
    width: 400px;

    .o_auth_button {
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        width: 100%;
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`

const Landing = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <StyledLanding>
      <h1 className="heading-1">Welcome To Pain</h1>
      <h3 className="heading-2">
        The setup process for Accoutabilibuddy will take real effort and time.
        It’s designed that way to ensure you are serious about your chosen
        Project as it will take real effort and time. If you choose to utilize
        this tool realize that you are taking a huge first step though I don’t
        believe you will actually make it to the last one.
      </h3>
      <h3 className="body-1">
        Just because it will take time does not mean you have to do it all in a
        single setting I recommend taking breaks in between questions to keep
        your brain from melting
      </h3>
      <div className="auth_options">
        <div className="o_auth_button">
          <GoogleIcon color="primary" />
          <Button
            variant="outlined"
            onClick={() => {
              void Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google
              })
            }}
          >
            Google
          </Button>
        </div>
        <div className="o_auth_button">
          <FacebookIcon color="primary" />
          <Button
            variant="outlined"
            onClick={() => {
              void Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Facebook
              })
            }}
          >
            Facebook
          </Button>
        </div>
        <div className="o_auth_button">
          <PersonIcon color="primary" />
          <Button
            variant="outlined"
            onClick={() => {
              navigate(ROUTES.AUTH)
            }}
          >
            Email / Password
          </Button>
        </div>
      </div>
    </StyledLanding>
  )
}

export default Landing

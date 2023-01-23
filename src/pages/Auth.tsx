import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Auth } from 'aws-amplify'
import { useLocation, useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'

import useBackEndMethods from '../hooks/useBackEndMethods'
import useGlobalState from '../global/GlobalSate'
import { DEFAULT_FORM_RESPONSES, ROUTES } from '../global/Constants'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'

const StyledAuthentication = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
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

  .text_field {
    padding-top: 12px;
    input {
      color: white;
    }
  }

  button {
  }

  .o_auth_button {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 8px;
    }
  }
`

const Authentication = (): JSX.Element => {
  const [authFormInView, setAuthFormInView] = useState('SIGN_UP')

  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')

  const [code, setCode] = useState('')

  const { handleGetProjects } = useBackEndMethods()
  const { setGlobalLoading } = useGlobalState()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  // NAVIGATES USER TO PROPER AUTH FLOW FROM LANDING PAGE BUTTONS
  useEffect(() => {
    if (pathname.includes('sign-up')) {
      setAuthFormInView('SIGN_UP')
    } else if (pathname.includes('sign-in')) {
      setAuthFormInView('SIGN_IN')
    }
  }, [pathname])

  const handleSignUpUser = async (): Promise<any> => {
    try {
      await Auth.signUp({
        username: userEmail,
        password,
        attributes: { email: userEmail },
        autoSignIn: { enabled: true }
      }).then(() => {
        setAuthFormInView('CONFIRM_EMAIL')
      })
    } catch (error) {
      console.log('error signing up:', error)
    }
  }

  const handleConfirmSignUpUser = async (): Promise<any> => {
    await Auth.confirmSignUp(userEmail, code)
      .then((res) => {
        console.log('NEW USER RES', res)
        navigate(
          `${ROUTES.PROJECT_SETUP}/${DEFAULT_FORM_RESPONSES.PROJECT_NAME}`
        )
      })
      .catch((err) => {
        console.log('error confirming sign up', err)
      })
  }

  const handleSignInUser = async (): Promise<any> => {
    setGlobalLoading(true)
    try {
      await Auth.signIn(userEmail, password).then(() => {
        navigate(ROUTES.PROJECT)
        handleGetProjects(() => {
          setGlobalLoading(false)
        })
      })
    } catch (error) {
      console.log('error signing in', error)
      setGlobalLoading(false)
    }
  }

  return (
    <StyledAuthentication>
      <h1 className="heading-1">Accountabilibuddy</h1>
      {authFormInView === 'SIGN_UP' && (
        <>
          <h3 className="heading-2">
            Let's get you set up before your ass is kicked
          </h3>
          <TextField
            className="text_field"
            variant="outlined"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <TextField
            className="text_field"
            variant="outlined"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Button
            onClick={() => {
              void handleSignUpUser()
            }}
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              setAuthFormInView('SIGN_IN')
            }}
          >
            I have an account
          </Button>
        </>
      )}
      {authFormInView === 'CONFIRM_EMAIL' && (
        <>
          <h3 className="heading-2">Confirm Sign Up</h3>
          <TextField
            className="text_field"
            variant="outlined"
            label="Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
            }}
          />
          <Button
            onClick={() => {
              void handleConfirmSignUpUser()
            }}
          >
            Verify Code
          </Button>
        </>
      )}
      {authFormInView === 'SIGN_IN' && (
        <>
          <h3 className="heading-2">Let's get back to work</h3>
          <TextField
            className="text_field"
            variant="outlined"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <TextField
            className="text_field"
            variant="outlined"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Button
            onClick={() => {
              void handleSignInUser()
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              setAuthFormInView('SIGN_UP')
            }}
          >
            I don't have an account
          </Button>
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
              Sign In with Google
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
              Sign In with Facebook
            </Button>
          </div>
        </>
      )}
    </StyledAuthentication>
  )
}

export default Authentication

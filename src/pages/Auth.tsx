import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import VisibilityIcon from '@mui/icons-material/Visibility'
import InputAdornment from '@mui/material/InputAdornment'

import useBackEndMethods from '../hooks/useBackEndMethods'
import useGlobalState from '../global/GlobalSate'
import { SETUP_PROJECT_SCREENS, ROUTES } from '../global/Constants'
import LogoBig from '../icons/LogoBig'

const StyledAuthentication = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20%;

  .logo {
    width: 100%;
    position: absolute;
    top: 100px;
  }

  .heading-2 {
    margin-bottom: 24px;
    width: 400px;
  }

  .text_field {
    margin-bottom: 24px;
    width: 400px;
  }

  .or_group {
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    .caption {
      margin: 0 8px;
      color: var(--color-white);
    }

    .or_line {
      border-bottom: 1px solid var(--color-white);
      width: 100%;
    }
  }

  .auth_options {
    .auth_option {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        position: relative;

        svg {
          position: absolute;
          left: 8px;
          margin-right: 8px;
        }
      }
    }
  }

  button {
    margin-bottom: 24px;
    width: 400px;
  }
`

const Authentication = (): JSX.Element => {
  const [authFormInView, setAuthFormInView] = useState('SIGN_UP')

  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [code, setCode] = useState('')

  const { handleGetProjects } = useBackEndMethods()
  const { setGlobalLoading } = useGlobalState()

  const navigate = useNavigate()

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
          `${ROUTES.PROJECT_SETUP}/${SETUP_PROJECT_SCREENS.PROJECT_NAME}`
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
      <LogoBig className="logo" />
      {authFormInView === 'SIGN_UP' && (
        <>
          <h3 className="heading-2">
            Let's get you set up before your ass is kicked
          </h3>
          <TextField
            className="text_field"
            variant="standard"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            className="text_field"
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}
                  />
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              void handleSignUpUser()
            }}
          >
            Sign Up
          </Button>
          <div className="or_group">
            <div className="or_line" />
            <h5 className="caption"> OR </h5>
            <div className="or_line" />
          </div>
          <div className="auth_options">
            <div className="auth_option">
              <Button
                variant="outlined"
                onClick={() => {
                  void Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Google
                  })
                }}
              >
                <GoogleIcon color="primary" />
                Google
              </Button>
            </div>
            <div className="auth_option">
              <Button
                variant="outlined"
                onClick={() => {
                  void Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Facebook
                  })
                }}
              >
                <FacebookIcon color="primary" />
                Facebook
              </Button>
            </div>
          </div>

          <Button
            variant="text"
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
            variant="standard"
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
            variant="standard"
            label="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            className="text_field"
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}
                  />
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              void handleSignInUser()
            }}
          >
            Log In
          </Button>
          <Button
            variant="text"
            onClick={() => {
              setAuthFormInView('SIGN_UP')
            }}
          >
            I don't have an account
          </Button>
        </>
      )}
    </StyledAuthentication>
  )
}

export default Authentication
